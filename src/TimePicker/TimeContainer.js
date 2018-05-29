/** @jsx createElement */
import React, {createElement} from 'react'
import Card from '../Card'
import TimeTicker from './TimeTicker'
import {DateTime, Duration} from 'luxon'

/**
 * A component containing the tickers of a time picker.
 */
export default class TimeContainer extends React.Component {
  /**
   * The default values for props of this component
   * @return {object} the default value object
   */
  static get defaultProps() {
    return {
      refocusOnClick: () => null,
      updateTime: () => null,
    }
  }

  /**
   * Creates a container for the time tickers. Sets state.time to the input's current value
   * @param {object} props the props
   */
  constructor(props) {
    super(props)
    this.state = {
      time: this.getLuxonDateTime(this.props.selectedTime),
    }
  }

  /**
   * Update state when props change. In particular, if we receive a different
   * `selectedTime` prop from up the hierarchy, set state.time to a new Luxon
   * DateTime appropriately (in order to force the tickers to the new time)
   * @param {*} nextProps the nextProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTime !== this.props.selectedTime) {
      this.setState({time: this.getLuxonDateTime(nextProps.selectedTime)})
    }
  }

  /**
   * Convert an iso time string to a Luxon DateTime. If iso time is blank / null,
   * or invalid (e.g. 11 : 17), return the local current time instead.
   * @param {string} time - the time to convert, as either an iso time, or a
   *   blank / null
   * @return {object} - the DateTime object
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

  /** Get the formatted value of the given unit for the currently selected time
   * @param {string} unit - the unit to be incremented (i.e. hour or minute)
   * @returns {string} formatted value as a string
   */
  /* eslint complexity: [2, 5] */
  getFormattedUnit(unit) {
    let value

    if (unit === 'hour' && !this.props.use24hr) {
      value = this.state.time[unit] % 12 ? this.state.time[unit] % 12 : 12
    } else {
      value = this.state.time[unit]
    }

    value = (value < 10 ? '0' : '') + value
    return value
  }

  /**
   * Increment the inputted unit by the inputted amount, n
   *
   * This function does not change the time in the input (only container display)
   * @param {int} num - the amount to increment the unit by
   * @param {int} unit - the unit to be incremented (i.e. hour or minute)
   * @param {Event} event - the event that caused this handler to be invoked
   *   (e.g. the click event from the next or previous button on a ticker)
   * @return {void}
   */
  incrementUnit(num, unit, event) {
    event.preventDefault()

    const durationObject = {}

    durationObject[unit] = num
    const newTime = this.state.time.plus(Duration.fromObject(durationObject))

    this.props.updateTime(newTime.toISOTime())

    this.setState({
      time: newTime,
    })

    if (this.props.refocusOnClick) {
      this.props.refocusOnClick()
    }
  }
  /* eslint complexity: [2, 6] */
  render() {
    const {className, use24hr, showSeconds, overlay} = this.props

    return (
      <div
        className={`rev-TimeContainer ${
          overlay ? 'rev-TimeContainer--overlay' : ''
        } ${className}`}
      >
        <Card>
          <Card.Header>
            <span className="rev-TimeContainer-header">Time Picker</span>
          </Card.Header>
          <Card.Body>
            <TimeTicker
              value={this.getFormattedUnit('hour')}
              onIncrement={this.incrementUnit.bind(this, 1, 'hours')}
              onDecrement={this.incrementUnit.bind(this, -1, 'hours')}
            />
            <span className="rev-TimeTicker-divider">:</span>
            <TimeTicker
              value={this.getFormattedUnit('minute')}
              onIncrement={this.incrementUnit.bind(this, 1, 'minutes')}
              onDecrement={this.incrementUnit.bind(this, -1, 'minutes')}
            />
            {showSeconds ? (
              <span className="rev-TimeTicker-divider">:</span>
            ) : null}
            {showSeconds ? (
              <TimeTicker
                value={this.getFormattedUnit('second')}
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
          </Card.Body>
        </Card>
      </div>
    )
  }
}
