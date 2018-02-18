/** @jsx createElement */

import React, { createElement } from 'react'
import TimeTicker from './TimeTicker'

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
      time: 'value'
    }
  }

  render() {
    const {
      className,
      ...props
    } = this.props

    return (
      <div className={`rev-TimeContainer ${className}`}>
        <TimeTicker />
        <span>:</span>
        <TimeTicker />
        <TimeTicker />
      </div>
    )
  }
}
