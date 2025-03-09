import React, {Component} from 'react'
import Card from '../Card'
import TimeTicker from './TimeTicker'
import {DateTime, Duration} from 'luxon'

export interface TimeContainerProps {
  className?: string
  selectedTime?: string
  updateTime?: (time: string) => void
  refocusOnClick?: () => void
  use24hr?: boolean
  showSeconds?: boolean
  overlay?: boolean
  [key: string]: any
}

interface TimeContainerState {
  time: DateTime
}

/**
 * A component containing the tickers of a time picker.
 */
export default class TimeContainer extends Component<TimeContainerProps, TimeContainerState> {
  /**
   * The default values for props of this component
   */
  static defaultProps = {
    refocusOnClick: () => null,
    updateTime: () => null,
  }

  /**
   * Creates a container for the time tickers. Sets state.time to the input's current value
   * @param {object} props the props
   */
  constructor(props: TimeContainerProps) {
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
  componentWillReceiveProps(nextProps: TimeContainerProps) {
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
  getLuxonDateTime(time?: string): DateTime {
    if (!time) {
      return DateTime.local()
    }

    const luxon = DateTime.fromISO(time)

    if (!luxon.isValid) {
      return DateTime.local()
    }

    return luxon
  }

  /** Get the formatted value of the given unit for the currently selected time
   * @param {string} unit - the unit to be incremented (i.e. hour or minute)
   * @returns {string} formatted value as a string
   */
  getFormattedUnit(unit: 'hour' | 'minute' | 'second'): string {
    let value: number

    if (unit === 'hour' && !this.props.use24hr) {
      value = this.state.time[unit] % 12 ? this.state.time[unit] % 12 : 12
    } else {
      value = this.state.time[unit]
    }

    return (value < 10 ? '0' : '') + value
  }

  /**
   * Increment the inputted unit by the inputted amount, n
   *
   * This function does not change the time in the input (only container display)
   * @param {number} num - the amount to increment the unit by
   * @param {string} unit - the unit to be incremented (i.e. hour or minute)
   * @param {Event} event - the event that caused this handler to be invoked
   *   (e.g. the click event from the next or previous button on a ticker)
   * @return {void}
   */
  incrementUnit = (num: number, unit: 'hours' | 'minutes' | 'seconds', event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const durationObject: Record<string, number> = {}

    durationObject[unit] = num
    const newTime = this.state.time.plus(Duration.fromObject(durationObject))

    if (this.props.updateTime) {
      this.props.updateTime(newTime.toISOTime() || '')
    }

    this.setState({
      time: newTime,
    })

    if (this.props.refocusOnClick) {
      this.props.refocusOnClick()
    }
  }

  render() {
    const {className, use24hr, showSeconds, overlay} = this.props

    return (
      <div
        className={`rev-TimeContainer ${
          overlay ? 'rev-TimeContainer--overlay' : ''
        } ${className || ''}`}
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