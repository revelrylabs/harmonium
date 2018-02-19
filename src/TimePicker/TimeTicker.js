/** @jsx createElement */

import classNames from 'classnames'
import React, { createElement } from 'react'
import Button from '../Button'

/**
 * A component which increments or decrements a unit of time,
 * e.g. (01-12 for hours, 00-59 for minutes, and AM/PM)
 * @param {object} props - the props of the TimeTicker
 */

 // TODO: Generalize this to a general incrementor/decrementor
 // component that can cycle through a range of numbers or an enum
 export default class TimeTicker extends React.Component {
  /**
   * The default values for props of this component
   * @return {object} the default value object
   */
  static get defaultProps() {
    const createElement = React.createElement

    return {
      previousLabel: <span>&#709;</span>,
      nextLabel: <span>&#708;</span>,
    }
  }

  /**
   * Creates a container for the time tickers.
   * @param {object} props
   */
  constructor(props) {
    super(props)
  }
  
  render () {
    const {
      className,
      previousLabel,
      nextLabel,
      value,
      onIncrement,
      onDecrement,
      refocusOnClick,
      ...props
    } = this.props

    return (
      <div {...props} className={`rev-TimeTicker ${className}`}>
        <Button
          onClick={onIncrement}
          className="rev-TimeTicker-button--next"
        >
          {nextLabel}
        </Button>

        <div className="rev-TimeTicker-value">
          {value}
        </div>

        <Button
          onClick={onDecrement}
          className="rev-TimeTicker-button--previous"
        >
          {previousLabel}
        </Button>
      </div>
    )
  }
}