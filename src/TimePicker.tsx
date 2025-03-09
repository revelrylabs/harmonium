import React, {Component, SyntheticEvent, ChangeEvent} from 'react'
import {omit} from 'lodash'
import TimeInput from './TimePicker/TimeInput'
import TimeContainer from './TimePicker/TimeContainer'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'
import {DateTime} from 'luxon'

/**
 * Determines if time type inputs are well supported on this platform
 * @return {boolean} true if time type inputs are well supported, false otherwise
 */
function useGoodTimeInput(): boolean {
  if (typeof window === 'undefined') {
    return true
  } else {
    const element = document.createElement('input')

    element.type = 'time'
    return element.type === 'time'
  }
}

export interface TimePickerProps {
  defaultValue?: string
  value?: string
  onChange?: (event: SyntheticEvent) => void
  onBlur?: (event: SyntheticEvent) => void
  onFocus?: (event: SyntheticEvent) => void
  error?: boolean | string
  help?: React.ReactNode
  label?: React.ReactNode
  className?: string
  isOpen?: boolean
  use24hr?: boolean
  showSeconds?: boolean
  useCalendarOnMobile?: boolean
  name?: string
  [key: string]: any
}

interface TimePickerState {
  isOpen: boolean
  focused: boolean
  isoValue?: string
  formattedValue: string
  generation: number
  mousedIn: boolean
}

/**
 * A TimePicker component containing inputs and a container with two to four ticker
 * components for hours, minutes, an optional seconds, and an optional AM/PM. */
class TimePicker extends React.Component<TimePickerProps, TimePickerState> {
  useGoodTimeInput: boolean
  nativeInput: HTMLInputElement | null = null

  /**
   * Create a time picker. Determines if we can use browser native time type input
   * or if we need to fall back to a text type input (based on support).
   * @param {object} props - the props
   */
  constructor(props: TimePickerProps) {
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
      mousedIn: false,
    }
  }

  /**
   * Handle updated props from up the chain. In particular, if we receive a new
   * time from up the hierarchy, we want to reset the inputs and the tickers to
   * that value.
   * @param {object} nextProps - the nextProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps: TimePickerProps) {
    this.setState(this.valuesFromProps(nextProps))
  }

  /**
   * Find the time value from the props, and convert it to two values-- an iso
   * time and a 'local' format time version (so we can deal with poorly formatted
   * text inputs intelligently).
   * @param {object} props - the props
   * @return {object} an object with two keys: isoValue & formattedValue
   */
  valuesFromProps(props: TimePickerProps) {
    return this.valuesFromIso(props.defaultValue || props.value)
  }

  /**
   * Take an ISO formatted time and turn it into an object with iso and local
   * format time.
   * @param {string} iso - an iso format time
   * @return {object} an object with two keys: isoValue & formattedValue
   */
  valuesFromIso(iso?: string) {
    return {
      isoValue: iso,
      formattedValue: this.isoToFormatted(iso),
    }
  }

  /**
   * Take an iso formatted time and put it into this picker's format
   * @param {string} iso - an iso format time
   * @return {string} a time formatted according to the format of this time picker
   */
  isoToFormatted(iso?: string): string {
    if (!iso) {
      return ''
    }
    return DateTime.fromISO(iso).toFormat(this.timeFormat)
  }

  /**
   * Process change events from the input by updating the isoValue & formattedValue
   * of this component. Will call down to an onChange handler passed in.
   * @param {Event} event - the change event fired from the input
   * @return {void}
   */
  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Take whatever format the input gave us, and turn it into an ISO time string
    const asISO = DateTime.fromFormat(
      event.target.value,
      this.timeFormat
    ).toISOTime()

    if (this.props.onChange) {
      // Call into an onChange we got as props
      this.props.onChange(event)
    }

    // Update isoValue & formattedValue from the ISO we built
    this.setState(this.valuesFromIso(asISO || ''))
  }

  /**
   * Return the time format the component is using. Will be 'HH:mm' (or HH:mm:ss if seconds are to be
   * shown) if we are using a well supported time input. If we have fallen back
   * to text field due to bad support, this will be 'hh:mm a' (or 'hh:mm:ss a' if seconds are to be shown).
   * @return {string} the time format in use by the component
   */
  get timeFormat(): string {
    // TODO: detect locale default format string and use that instead of
    //   hardcoded 'HH:mm'
    if (this.useGoodTimeInput) {
      return this.props.showSeconds ? 'HH:mm:ss' : 'HH:mm'
    }
    return this.props.showSeconds ? 'hh:mm:ss a' : 'hh:mm a'
  }

  /**
   * Invoked by a time ticker to tell the time picker to update the inputs (onClick
   * of the ticker buttons).
   * @param {string} time - the new time, in the format hh:mm
   * @return {void}
   */
  updateTime = (time: string) => {
    // Update isoValue & formattedValue based on the time value (which is an iso
    // time)
    this.setState(this.valuesFromIso(time), () => {
      // Update the native input value with the formatted version of the new time
      // (this prevents the native input value from sticking with a hand-typed
      // input value after the button is clicked in certain situations)
      // It also sets us up to fire off a synthetic change event that looks just
      // like change event from a typed input (so external change handlers are
      // properly) invoked
      if (this.nativeInput) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set

        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(this.nativeInput, this.isoToFormatted(time))
        }

        this.fireChangeHandler()
      }

      // Force the input to be focused again (so that we don't immediately close
      // the ticker container because the button click makes us not focused on the input)
      this.refocusOnClick()
    })
  }

  /**
   * Create a synthetic change event and send it into the change handlers as if
   * the user had typed the new value. This makes typed input and time ticker button
   * clicks fire off the same handlers.
   * @return {void}
   */
  fireChangeHandler = () => {
    if (this.nativeInput) {
      const event = new Event('change', {bubbles: true, cancelable: false})

      this.nativeInput.dispatchEvent(event)
      this.onChange(event as unknown as ChangeEvent<HTMLInputElement>)
    }
  }

  /**
   * Mark the input as in focus. Used to determine whether the time ticker container should
   * be open.
   * @param {Event} event - the focus event
   * @return {void}
   */
  onFocus = (event?: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus && event) {
      this.props.onFocus(event)
    }

    this.setState({focused: true, isOpen: true})
  }

  /**
   * Mark the input as out of focus. Used to determine whether the time ticker container should
   * be closed.
   * @param {Event} event - the blur event
   * @return {void}
   */
  onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }

    this.setState({focused: false, isOpen: this.state.mousedIn})
  }

  /**
   * Force the input back into focus. Used when time ticker buttons are clicked, so
   * that the input stays in focus and we don't close the container.
   * @return {void}
   */
  refocusOnClick = () => {
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
  useNativePicker = (): boolean => {
    return (
      typeof navigator !== 'undefined' &&
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    )
  }

  /**
   * Track when the mouse cursor is over the component, so that we can not
   * immediately close the container when we lose focus-- which happens if you
   * click the container buttons.
   * @return {void}
   */
  mouseIn = () => {
    this.setState({mousedIn: true})
  }

  /**
   * Track when the mouse is no longer over the component, which means that it
   * is safe to close the calendar if we lose focus, for example, because the
   * focus has moved to the next element.
   * @return {void}
   */
  mouseOut = () => {
    this.setState({mousedIn: false, isOpen: this.state.focused})
  }

  /**
   * Render method for the component
   * @return {JSX} render
   */
  render() {
    const {
      error,
      help,
      label,
      className,
      showSeconds,
      use24hr,
      useCalendarOnMobile,
      name,
      ...props
    } = this.props
    const nativeProps = omit(props, ['isOpen', 'value', 'defaultValue', 'onChange'])
    const timeFormat = this.timeFormat
    const {isoValue, formattedValue, generation, isOpen} = this.state
    const useGoodTimeInput = this.useGoodTimeInput
    const useNativePicker = this.useNativePicker()
    const shouldHideContainer = useNativePicker && !useCalendarOnMobile

    return (
      <div
        className={`rev-TimePicker ${className || ''}`}
        onMouseOver={this.mouseIn}
        onMouseOut={this.mouseOut}
      >
        <label className="rev-TimePicker-label">{label}</label>
        <div className="rev-TimePicker-inputGroup">
          <TimeInput
            {...nativeProps}
            name={name}
            useGoodTimeInput={useGoodTimeInput}
            showSeconds={showSeconds}
            formattedValue={formattedValue}
            isoValue={isoValue}
            generation={generation}
            inputRef={(input: HTMLInputElement) => {
              this.nativeInput = input
            }}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            error={error}
          />
          {shouldHideContainer ? null : (
            <TimeContainer
              selectedTime={isoValue}
              use24hr={use24hr}
              showSeconds={showSeconds}
              updateTime={this.updateTime}
              refocusOnClick={this.refocusOnClick}
              overlay={isOpen}
              className={isOpen ? 'rev-TimeContainer--open' : ''}
            />
          )}
        </div>
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
      </div>
    )
  }
}

export default TimePicker 