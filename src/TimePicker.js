import React from 'react'
import PropTypes from 'prop-types';
import TimeInput from './TimePicker/TimeInput'
import TimeContainer from './TimePicker/TimeContainer'

/** 
 * A TimePicker component containing inputs and a container with three ticker
 * components for hours, minutes, and AM/PM respectively. */
class TimePicker extends React.Component {
  /**
   * Create a time picker. Determines if we can use browser native time type input
   * or if we need to fall back to a text type input (based on support).
   * @param {object} props
   */
  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen || false,
      focused: false,
    }
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

    this.setState({ focused: false, isOpen: false })
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
    let {
      label,
      isOpen,
      refocusOnClick,
      ...props
    } = this.props

    return (
      <label
        className={`rev-TimePicker rev-InputLabel`}
      >
        {label}
        <TimeInput
          {...props}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          inputRef={input => (this.nativeInput = input)}
        />
        <TimeContainer
          {...props}
          className={this.isContainerOpen ? 'rev-TimeContainer--open' : 'rev-TimeContainer--closed'}
          refocusOnClick={this.refocusOnClick.bind(this)}
        />
      </label>
    )
  }
}

TimePicker.propTypes = {
  label: PropTypes.node,
  isOpen: PropTypes.bool
}

TimePicker.TimeInput = TimeInput
TimePicker.TimeContainer = TimeContainer
export { TimeInput, TimeContainer };
export default TimePicker
