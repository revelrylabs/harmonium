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
      updateTime: () => null,
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
   * Update state when props change. In particular, if we receive a different
   * `selectedTime` prop from up the hierarchy, set state.time to a new Luxon
   * DateTime appropriately (in order to force the tickers to the new time)
   * @param {*} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTime != this.props.selectedTime) {
      this.setState({ time: this.getLuxonDateTime(nextProps.selectedTime) })
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

  /** Get the hour value for the currently selected time
   * @returns {string} formatted hours value
   */
  getHours() {
    let hour = this.state.time.hour % 12 ? this.state.time.hour % 12 : 12
    hour = (hour < 10 ? '0' : '') + hour
    return hour
  }

  /** Get the minute value for the currently selected time
   * @returns {string} formatted minutes value
   */
  getMinutes() {
    let minute = this.state.time.minute
    minute = (minute < 10 ? '0' : '') + minute
    return minute
  }

  /** Get the second value for the currently selected time
   * @returns {string} formatted seconds value
   */
  getSeconds() {
    let second = this.state.time.second
    second = (second < 10 ? '0' : '') + second
    return second
  }

  /**
   * Increment the inputted unit by the inputted amount, n
   *
   * This function does not change the time in the input (only container display)
   * @param {int} n - the amount to increment the unit by
   * @param {int} unit - the unit to be incremented
   * @param {Event} event - the event that caused this handler to be invoked
   *   (e.g. the click event from the next or previous button on a ticker)
   */
  incrementUnit(n, unit, event) {
    event.preventDefault()

    const durationObject = {}
    durationObject[unit] = n
    const newTime = this.state.time.plus(Duration.fromObject(durationObject))

    this.props.updateTime(newTime.toISOTime())

    this.setState({
      time: newTime
    })

    if (this.props.refocusOnClick) {
      this.props.refocusOnClick()
    }
  }

  render() {
    const {
      className,
      selectedTime,
      updateTime,
      refocusOnClick,
      use24hr,
      showSeconds,
      ...props
    } = this.props

    return (
      <div className={`rev-TimeContainer ${className}`}>
        <TimeTicker
          value={this.getHours()}
          onIncrement={this.incrementUnit.bind(this, 1, 'hours')}
          onDecrement={this.incrementUnit.bind(this, -1, 'hours')}
        />
        <span>:</span>
        <TimeTicker
          value={this.getMinutes()}
          onIncrement={this.incrementUnit.bind(this, 1, 'minutes')}
          onDecrement={this.incrementUnit.bind(this, -1, 'minutes')}
        />
        {showSeconds ? (<span>:</span>) : null}
        {showSeconds ? (
          <TimeTicker
            value={this.getSeconds()}
            onIncrement={this.incrementUnit.bind(this, 1, 'seconds')}
            onDecrement={this.incrementUnit.bind(this, -1, 'seconds')}
          />
        ) : null}
        {use24hr ? null : (
          <TimeTicker
            value={this.state.time.hour >= 12 ? 'PM' : 'AM'}
            onIncrement={this.incrementUnit.bind(this, 12, 'hours')}
            onDecrement={this.incrementUnit.bind(this, -12, 'hours')}
          />
        )}
      </div>
    )
  }
}
