/** @jsx createElement */

import React, { createElement } from 'react'
import TimeTicker from './TimeTicker'
import { DateTime } from 'luxon';

/**
 * A component containing the tickers of a time picker.
 */
export default class TimeContainer extends React.Component {
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
   * Convert an iso date string to a Luxon DateTime. If iso date is blank / null,
   * or invalid (e.g. 2018-06-66), return the local current date instead.
   * @param {string} date - the date to convert, as either an iso date, or a
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

  render() {
    const {
      className,
      selectedTime,
      ...props
    } = this.props

    return (
      <div className={`rev-TimeContainer ${className}`}>
        <TimeTicker value={this.state.time.hour % 12} />
        <span>:</span>
        <TimeTicker value={this.state.time.minute} />
        <TimeTicker value={this.state.time.hour >= 12 ? 'PM' : 'AM'} />
      </div>
    )
  }
}
