/** @jsx createElement */

import React, { createElement } from 'react'
import TimeTicker from './TimeTicker'
import { DateTime, Duration } from 'luxon'

/**
 * A component containing the tickers of a time picker.
 */
export default class TimeContainer extends React.Component {
  /**
   * The default values for props of this component
   * @return {object} the default value object
   */
  static get defaultProps() {
    const createElement = React.createElement

    return {
      refocusOnClick: () => null,
    }
  }

  /**
   * Creates a container for the time tickers. Sets state.time to the input's current value
   * @param {object} props
   */
  constructor(props) {
    super(props)
    this.state = {
      time: this.getLuxonDateTime(this.props.selectedTime)
    }
  }

  /**
   * Convert an iso time string to a Luxon DateTime. If iso time is blank / null,
   * or invalid (e.g. 11 : 17), return the local current time instead.
   * @param {string} time - the time to convert, as either an iso time, or a
   *   blank / null
   */
  getLuxonDateTime(time) {
    if (!time) {
      return DateTime.local()
    }

    const luxon = DateTime.fromISO(time)

    if (luxon.invalid) {
      return DateTime.local()
    }

    return luxon
  }

  /**
   * Increment the inputted unit by the inputted amount, n
   *
   * This function does not change the date in the input (only container display)
   * @param {int} n - the amount to increment the unit by
   * @param {int} unit - the unit to be incremented
   * @param {Event} event - the event that caused this handler to be invoked
   *   (e.g. the click event from the next or previous button on a ticker)
   */
  incrementUnit(n, unit, event) {
    event.preventDefault()
    const durationObject = {};
    durationObject[unit] = n;
    this.setState({
      time: this.state.time.plus(Duration.fromObject(durationObject))
    })
    if (this.props.refocusOnClick) {
      this.props.refocusOnClick()
    }
  }

  render() {
    const {
      className,
      selectedTime,
      refocusOnClick,
      ...props
    } = this.props

    return (
      <div className={`rev-TimeContainer ${className}`}>
        <TimeTicker
          value={this.state.time.hour % 12 ? this.state.time.hour % 12 : 12}
          onIncrement={this.incrementUnit.bind(this, 1, 'hour')}
          onDecrement={this.incrementUnit.bind(this, -1, 'hour')}
        />
        <span>:</span>
        <TimeTicker
          value={this.state.time.minute}
          onIncrement={this.incrementUnit.bind(this, 1, 'minute')}
          onDecrement={this.incrementUnit.bind(this, -1, 'minute')}
        />
        <TimeTicker value={this.state.time.hour >= 12 ? 'PM' : 'AM'} />
      </div>
    )
  }
}
