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
   * be open or not.
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
   * be open or not.
   * @param {Event} event - the blur event
   */
  onBlur(event) {
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }

    this.setState({ focused: false, isOpen: false })
  }

  /**
   * Returns true if the time container is opened, which is if:
   * - isOpen prop or state is set to true (state is true if the input is in focus)
   * - AND the input is not disabled
   * @returns {boolean} - true if the time container is open
   */
  get isContainerOpen() {
    return (this.state.isOpen || this.props.isOpen) &&
           !this.props.disabled
  }

  render() {
    let {
      label,
      isOpen,
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
        />
        <TimeContainer
          {...props}
          className={this.isContainerOpen ? 'rev-TimeContainer--open' : 'rev-TimeContainer--closed'}
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
