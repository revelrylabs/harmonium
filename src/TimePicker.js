import React from 'react'
import PropTypes from 'prop-types'
import TimeInput from './TimePicker/TimeInput'
import TimeContainer from './TimePicker/TimeContainer'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'
import { DateTime } from 'luxon'

/**
 * Determines if time type inputs are well supported on this platform
 * @return {boolean} true if time type inputs are well supported, false otherwise
 */
function useGoodTimeInput() {
  if (typeof window === 'undefined') {
    return true
  } else {
    const el = document.createElement('input')
    el.type = 'time'
    return el.type === 'time'
  }
}

/* TODO FEATURES:
    allow keyboard up & down to increment/decrement for accessibility concerns,
    overrides,
    allow setting how much each button should increment,
    allowing min and/or max times to be declared,
    maybe giving ability to disallow certain times to be selected?
      ^ might not need it if combination of min/max times and setting
        increment amounts achieves same purpose
*/

/**
 * A TimePicker component containing inputs and a container with two to four ticker
 * components for hours, minutes, an optional seconds, and an optional AM/PM. */
class TimePicker extends React.Component {
  /**
   * Create a time picker. Determines if we can use browser native time type input
   * or if we need to fall back to a text type input (based on support).
   * @param {object} props
   */
  constructor(props) {
    super(props)
    this.useGoodTimeInput = useGoodTimeInput()
    this.state = {
      isOpen: this.props.isOpen || false,
      focused: false,
      // Handles setting both the iso and 'local' format versions of the time
      // into state. We do this so that we can always accept ISO times from
      // up the hierarchy, but also handle accepting change events from unchecked
      // oddly formatted text inputs
      ...this.valuesFromProps(props),
      // Generation exists to force the inputs in the component to accept the
      // new value when we click a ticker
      generation: 0,
      mousedIn: false
    }
  }

  /**
   * Handle updated props from up the chain. In particular, if we receive a new
   * time from up the hierarchy, we want to reset the inputs and the tickers to
   * that value.
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState(this.valuesFromProps(nextProps))
  }

  /**
   * Find the time value from the props, and convert it to two values-- an iso
   * time and a 'local' format time version (so we can deal with poorly formatted
   * text inputs intelligently).
   * @param {object} props
   * @return {object} an object with two keys: isoValue & formattedValue
   */
  valuesFromProps(props) {
    return this.valuesFromIso(props.defaultValue || props.value)
  }

  /**
   * Take an ISO formatted time and turn it into an object with iso and local
   * format time.
   * @param {string} iso - an iso format time
   * @return {object} an object with two keys: isoValue & formattedValue
   */
  valuesFromIso(iso) {
    return {
      isoValue: iso,
      formattedValue: this.isoToFormatted(iso)
    }
  }

  /**
   * Take an iso formatted time and put it into this picker's format
   * @param {string} iso - an iso format time
   * @return {string} a time formatted according to the format of this time picker
   */
  isoToFormatted(iso) {
    if (!iso) {
      return ''
    }
    return DateTime.fromISO(iso).toFormat(this.timeFormat)
  }

  /**
   * Process change events from the input by updating the isoValue & formattedValue
   * of this component. Will call down to an onChange handler passed in.
   * @param {Event} event - the change event fired from the input
   */
  onChange(event) {
    // Take whatever format the input gave us, and turn it into an ISO time string
    const asISO = DateTime.fromFormat(event.target.value, this.timeFormat).toISOTime()

    if (this.props.onChange) {
      // Call into an onChange we got as props
      this.props.onChange(event)
    }

    // Update isoValue & formattedValue from the ISO we built
    this.setState(this.valuesFromIso(asISO))
  }

  /**
   * Return the time format the component is using. Will be 'HH:mm' (or HH:mm:ss if seconds are to be
   * shown) if we are using a well supported time input. If we have fallen back
   * to text field due to bad support, this will be 'hh:mm a' (or 'hh:mm:ss a' if seconds are to be shown).
   * @return {string} the time format in use by the component
   */
  get timeFormat() {
    // TODO: detect locale default format string and use that instead of
    //   hardcoded 'HH:mm'
    return this.useGoodTimeInput ? this.props.showSeconds ? 'HH:mm:ss' : 'HH:mm'
                                 : this.props.showSeconds ? 'hh:mm:ss a' : 'hh:mm a'
  }

  /**
   * Invoked by a time ticker to tell the time picker to update the inputs (onClick
   * of the ticker buttons).
   * @param {string} time - the new time, in the format hh:mm
   */
  updateTime(time) {
    // Update isoValue & formattedValue based on the time value (which is an iso
    // time)
    this.setState(this.valuesFromIso(time))

    // Update the native input value with the formatted version of the new time
    // (this prevents the native input value from sticking with a hand-typed
    // input value after the button is clicked in certain situations)
    // It also sets us up to fire off a synthetic change event that looks just
    // like change event from a typed input (so external change handlers are
    // properly) invoked
    this.nativeInput.value = this.isoToFormatted(time)

    this.fireChangeHandler()

    // Force the input to be focused again (so that we don't immediately close
    // the ticker container because the button click makes us not focused on the input)
    this.refocusOnClick()
  }

  /**
   * Create a synthetic change event and send it into the change handlers as if
   * the user had typed the new value. This makes typed input and time ticker button
   * clicks fire off the same handlers.
   */
  fireChangeHandler() {
    const event = new Event('change')
    this.nativeInput.dispatchEvent(event)
    this.onChange(event)
  }

  /**
   * Mark the input as in focus. Used to determine whether the time ticker container should
   * be open.
   * @param {Event} event - the focus event
   */
  onFocus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }

    this.setState({ focused: true, isOpen: true })
  }

  /**
   * Mark the input as out of focus. Used to determine whether the time ticker container should
   * be closed.
   * @param {Event} event - the blur event
   */
  onBlur(event) {
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }

    this.setState({ focused: false, isOpen: this.state.mousedIn })
  }

  /**
   * Force the input back into focus. Used when time ticker buttons are clicked, so
   * that the input stays in focus and we don't close the container.
   */
  refocusOnClick() {
    if (this.nativeInput) {
      this.nativeInput.focus()
    }
    this.onFocus()
  }

  /**
   * Test whether we're on android or iphone. In that case, we hide the time picker
   * (unless we specify the usePickerOnMobile prop to force it). This is because
   * those platforms have native inputs for time which are much better for touch
   * than what we can do with time tickers.
   * @return {boolean} - true if on iOS or Android
   */
  useNativePicker() {
    return typeof navigator !== 'undefined' &&
           /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  }

  /**
   * Track when the mouse cursor is over the component, so that we can not
   * immediately close the container when we lose focus-- which happens if you
   * click the container buttons.
   */
  mouseIn() {
    this.setState({ mousedIn: true })
  }

  /**
   * Track when the mouse is no longer over the component, which means that it
   * is safe to close the container if we lose focus, for example, because the
   * focus has moved to the next element.
   */
  mouseOut() {
    this.setState({ mousedIn: false, isOpen: this.state.focused })
  }

  /**
   * Returns true if the time container is opened, which is if:
   * - isOpen prop or state is set to true (state is true if the input is in focus)
   * - AND the input is not disabled
   * - AND we're not using the iOS / Android native picker (i.e. we're not on
   *   those platform OR we used props.useContainerOnMobile to force non-native
   *   input)
   * @returns {boolean} - true if the time container is open
   */
  get isContainerOpen() {
    return (this.state.isOpen || this.props.isOpen) &&
           !this.props.disabled &&
           (!this.useNativePicker() || this.props.usePickerOnMobile)
  }

  render() {
    const {
      label,
      error,
      help,
      isOpen,
      use24hr,
      showSeconds,
      usePickerOnMobile,
      overlay,
      ...props
    } = this.props

    const nativeClass = this.useNativePicker() ? 'rev-TimePicker--native' : 'rev-TimePicker--custom'

    return (
      <label
        className={`rev-TimePicker rev-InputLabel ${nativeClass}`}
        onMouseOver={this.mouseIn.bind(this)}
        onMouseOut={this.mouseOut.bind(this)}
      >
        {label}
        <TimeInput
          {...props}
          error={error}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
          useGoodTimeInput={this.useGoodTimeInput}
          showSeconds={showSeconds}
          formattedValue={this.state.formattedValue}
          generation={this.state.generation}
          inputRef={input => (this.nativeInput = input)}
        />
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
        <TimeContainer
          {...props}
          className={this.isContainerOpen ? 'rev-TimeContainer--open' : 'rev-TimeContainer--closed'}
          selectedTime={this.state.isoValue}
          updateTime={this.updateTime.bind(this)}
          refocusOnClick={this.refocusOnClick.bind(this)}
          use24hr={use24hr}
          showSeconds={showSeconds}
          overlay={overlay}
        />
      </label>
    )
  }
}

TimePicker.propTypes = {
  label: PropTypes.node,
  error: PropTypes.node,
  help: PropTypes.node,
  timeFormat: PropTypes.string,
  use24hr: PropTypes.bool,
  showSeconds: PropTypes.bool,
  isOpen: PropTypes.bool,
}

TimePicker.TimeInput = TimeInput
TimePicker.TimeContainer = TimeContainer
export { TimeInput, TimeContainer }
export default TimePicker
