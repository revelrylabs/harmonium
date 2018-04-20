/** @jsx createElement */

import React from 'react'
import PropTypes from 'prop-types'
import {uniqueId, omit} from 'lodash'
import Calendar from './DatePicker/Calendar'
import DateInputBlock from './DatePicker/DateInputBlock'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'
import createElementWithOverride from './Utilities/createElementWithOverride'
import {DateTime} from 'luxon'

/**
 * Return true if date type inputs are well supported on this platform
 * @return {boolean} true is date type inputs are well supported, false otherwise
 */
function goodDateInput() {
  if (typeof window === 'undefined') {
    return true
  } else {
    const element = document.createElement('input')

    element.type = 'date'
    element.value = '!)'
    return element.value === ''
  }
}

/**
 * Return true if Firefox browser
 * Date type inputs are supported on Firefox but not possible to
 * prevent the native calendar popup dialog, resulting in two calendars
 * showing. Need to default to type text input.
 * @return {boolean} true is date type inputs are well supported, false otherwise
 */

const isFirefox = () => {
  return /Firefox/i.test(navigator.userAgent)
}

/** A DatePicker component containing inputs and a calendar. */
class UncontrolledDatePicker extends React.Component {
  /**
   * The default values for props of this component
   * @return {object} the default value object
   */
  static get defaultProps() {
    return {
      isSelectable: () => true,
    }
  }

  /**
   * Create a datepicker. Determines if we can use browser native date type input
   * or if we need to fall back to a text type input (based on support and if a
   * non-standard format is specified.)
   * @param {object} props - the props
   */
  /* eslint complexity: [2, 4] */
  constructor(props) {
    super(props)
    // On platforms with poor date input support, or when non-standard format is
    // specified, we have to fall back to a text type input
    this.goodDateInput =
      goodDateInput() && !this.props.dateFormat && !isFirefox()
    this.state = {
      isOpen: this.props.isOpen || false,
      focused: false,
      // Handles setting both the iso and 'local' format versions of the date
      // into state. We do this so that we can always accept ISO dates from
      // up the hierarchy, but also handle accepting change events from unchecked
      // oddly formatted text inputs
      ...this.valuesFromProps(props),
      // Generation exists to force the inputs in the component to accept the
      // new value when we click the calendar
      generation: 0,
      mousedIn: false,
    }
  }

  /**
   * Handle updated props from up the chain. In particular, if we receive a new
   * date from up the hierarchy, we want to reset the inputs and the calendar to
   * that value.
   * @param {object} nextProps - the next props
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState(this.valuesFromProps(nextProps))
  }

  /**
   * Find the date value from the props, and convert it to two values-- an iso
   * date and a 'local' format date version (so we can deal with poorly formatted
   * text inputs intelligently).
   * @param {object} props - the props
   * @return {object} an object with two keys: isoValue & formattedValue
   */
  valuesFromProps(props) {
    return this.valuesFromIso(props.defaultValue || props.value)
  }

  /**
   * Take an ISO formatted date and turn it into an object with iso and local
   * format date.
   * @param {string} iso - an iso format date
   * @return {object} an object with two keys: isoValue & formattedValue
   */
  valuesFromIso(iso) {
    return {
      isoValue: iso,
      formattedValue: this.isoToFormatted(iso),
    }
  }

  /**
   * Take an iso formatted date and put it into this picker's format
   * @param {string} iso - an iso format date
   * @return {string} a date formatted according to the format of this date picker
   */
  isoToFormatted(iso) {
    if (!iso) {
      return ''
    }
    return DateTime.fromISO(iso).toFormat(this.dateFormat)
  }

  /**
   * Process change events from the input by updating the isoValue & formattedValue
   * of this component. Will call down to an onChange handler passed in.
   * @param {Event} event - the change event fired from the input
   * @return {void}
   */
  onChange(event) {
    // Take whatever format the input gave us, and turn it into an ISO date string
    const asISO = DateTime.fromFormat(
      event.target.value,
      this.dateFormat
    ).toISODate()

    if (this.props.onChange) {
      // Call into an onChange we got as props
      this.props.onChange(event)
    }

    // Update isoValue & formattedValue from the ISO we built
    this.setState(this.valuesFromIso(asISO))
  }

  /**
   * Return the date format the component is using. Will be yyyy-MM-dd if we are
   * using a well supported date input (without custom format). If we have fallen
   * back to text field due to custom format or bad support, this will be the
   * custom format (defaulting to 'MM/dd/yyyy').
   * @return {string} the date format in use by the component
   */
  get dateFormat() {
    // TODO: detect locale default format string and use that instead of
    //   hardcoded 'MM/dd/yyyy'
    return this.goodDateInput
      ? 'yyyy-MM-dd'
      : this.props.dateFormat || 'MM/dd/yyyy'
  }

  /**
   * Invoked by the calendar to tell the date picker to update the inputs (onClick
   * of the calendar buttons).
   * @param {string} date - the new date, in the format yyyy-MM-dd
   * @return {void}
   */
  dateChanger(date) {
    // Update isoValue & formattedValue based on the date value (which is an iso
    // date)
    this.setState(this.valuesFromIso(date))
    // Update the native input value with the formatted version of the new date
    // (this prevents the native input value from sticking with a hand-typed
    // input value after the button is clicked in certain situations)
    // It also sets us up to fire off a synthetic change event that looks just
    // like change event from a typed input (so external change handlers are
    // properly) invoked
    this.nativeInput.value = this.isoToFormatted(date)

    this.fireChangeHandler()

    // Force the input to be focused again (so that we don't immediately close
    // the calendar because the button click makes us not focused on the input)
    this.refocus()
  }

  /**
   * Create a synthetic change event and send it into the change handlers as if
   * the user had typed the new value. This makes typed input and calendar button
   * clicks fire off the same handlers.
   * @return {void}
   */
  fireChangeHandler() {
    const event = new Event('change')

    this.nativeInput.dispatchEvent(event)
    this.onChange(event)
  }

  /**
   * Test whether we're on android or iphone. In that case, we hide the calendar
   * (unless we specify the useCalendarOnMobile prop to force it). This is because
   * those platforms have native inputs for dates which are much better for touch
   * than what we can do with a calendar.
   * @return {boolean} - true if on iOS or Android
   */
  useNativePicker() {
    return (
      typeof navigator !== 'undefined' &&
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    )
  }

  /**
   * Track when the mouse cursor is over the component, so that we can not
   * immediately close the calendar when we lose focus-- which happens if you
   * click the calendar buttons.
   * @return {void}
   */
  mouseIn() {
    this.setState({mousedIn: true})
  }

  /**
   * Track when the mouse is no longer over the component, which means that it
   * is safe to close the calendar if we lose focus, for example, because the
   * focus has moved to the next element.
   * @return {void}
   */
  mouseOut() {
    this.setState({mousedIn: false, isOpen: this.state.focused})
  }

  /**
   * Mark the input as in focus. Used to determine whether the calendar should
   * be open or not.
   * @param {Event} event - the focus event
   * @return {void}
   *
   */
  focus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }

    if (!this.calendar.contains(event.target) && this.state.isOpen) {
      console.log('Outside!')
      this.setState({focused: false, isOpen: false})
      return
    }
    console.log('focusing')
    this.setState({focused: true, isOpen: true})
  }

  /**
   * Mark the input as out of focus. Used to determine whether the calendar should
   * be open or not.
   * @param {Event} event - the focus event
   * @return {void}
   */
  blur(event) {
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
    console.log('blurring')
    this.setState({focused: false, isOpen: this.state.mousedIn})
  }

  /**
   * Force the input back into focus. Used when calendar buttons are clicked, so
   * that the input stays in focus and we don't close the calendar.
   * @return {void}
   */
  refocus() {
    if (this.nativeInput) {
      this.nativeInput.focus()
    }
    console.log('refocusing')
    this.focus()
  }

  /**
   * Returns true if the calendar should be opened, which is if:
   * - isOpen prop or state is set to true (state is true if the input is in
   *   focus or moused over)
   * - AND the input is not disabled
   * - AND we're not using the iOS / Android native picker (i.e. we're not on
   *   those platform OR we used props.useCalendarOnMobile to force non-native
   *   input)
   * @returns {boolean} - true if the calendar should be open
   */
  /* eslint complexity: [2, 5] */
  get calendarOpened() {
    return (
      (this.state.isOpen || this.props.isOpen) &&
      !this.props.disabled &&
      (!this.useNativePicker() || this.props.useCalendarOnMobile)
    )
  }

  getCalendarRef(ref) {
    this.calendar = ref
  }

  render() {
    const {
      error,
      help,
      label,
      highlights,
      overrides,
      isSelectable,
      calendar,
      week,
      day,
      headerDay,
      overlay,
      ...props
    } = this.props
    const createElement = createElementWithOverride.bind(this, overrides)
    const nativeClass = this.useNativePicker()
      ? 'rev-DatePicker--native'
      : 'rev-DatePicker--custom'
    const inputId = uniqueId('DateInputBlock:')
    const dateInputBlockProps = omit(props, 'isOpen')

    console.log('is it open?', this.state.isOpen)

    return (
      <label
        htmlFor={inputId}
        className={`rev-DatePicker rev-InputLabel ${nativeClass}`}
        onMouseOver={this.mouseIn.bind(this)}
        onMouseOut={this.mouseOut.bind(this)}
        onFocus={this.focus.bind(this)}
        onBlur={this.blur.bind(this)}
      >
        {label}
        <DateInputBlock
          {...dateInputBlockProps}
          id={inputId}
          error={error}
          isoValue={this.state.isoValue}
          formattedValue={this.state.formattedValue}
          goodDateInput={this.goodDateInput}
          onFocus={this.focus.bind(this)}
          onBlur={this.blur.bind(this)}
          onChange={this.onChange.bind(this)}
          generation={this.state.generation}
          inputRef={(input) => (this.nativeInput = input)}
          overrides={overrides}
        />
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
        <Calendar
          onClick={this.focus.bind(this)}
          selectedDate={this.state.isoValue}
          dateChanger={this.dateChanger.bind(this)}
          focuser={this.refocus.bind(this)}
          overrides={overrides}
          isSelectable={isSelectable}
          week={week}
          highlights={highlights}
          overlay={overlay}
          {...calendar}
          day={day}
          headerDay={headerDay}
          className={
            this.calendarOpened ? 'rev-Calendar--open' : 'rev-Calendar--closed'
          }
          getCalendarRef={this.getCalendarRef.bind(this)}
        />
      </label>
    )
  }
}

UncontrolledDatePicker.propTypes = {
  error: PropTypes.node,
  help: PropTypes.node,
  label: PropTypes.node,
  highlights: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.objectOf(PropTypes.string),
    PropTypes.func,
  ]),
  isOpen: PropTypes.bool,
  overrides: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(React.Component)])
  ),
  isSelectable: PropTypes.func,
  calendar: PropTypes.object,
  week: PropTypes.object,
  day: PropTypes.object,
  headerDay: PropTypes.object,
  useCalendarOnMobile: PropTypes.bool,
}

UncontrolledDatePicker.DateInputBlock = DateInputBlock
UncontrolledDatePicker.Calendar = Calendar
export {Calendar, DateInputBlock}
export default UncontrolledDatePicker
