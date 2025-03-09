import React, {Component, ReactNode} from 'react'
import Button from '../Button'

/**
 * A component which increments or decrements a unit of time,
 * e.g. (01-12 for hours, 00-59 for minutes, and AM/PM)
 * @param {object} props - the props of the TimeTicker
 */

// TODO: Generalize this to a general incrementor/decrementor
// component that can cycle through a range of numbers or an enum

export interface TimeTickerProps {
  previousLabel?: ReactNode
  nextLabel?: ReactNode
  value?: any
  onIncrement?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onDecrement?: (event: React.MouseEvent<HTMLButtonElement>) => void
  refocusOnClick?: boolean
  className?: string
  [key: string]: any
}

class TimeTicker extends Component<TimeTickerProps> {
  static defaultProps = {
    previousLabel: <span>&#709;</span>,
    nextLabel: <span>&#708;</span>,
  }

  render() {
    const {
      className,
      previousLabel,
      nextLabel,
      value,
      onIncrement,
      onDecrement,
      ...props
    } = this.props

    return (
      <div {...props} className={`rev-TimeTicker ${className || ''}`}>
        <Button
          onClick={onIncrement}
          className="rev-TimeTicker-button rev-TimeTicker-button--next"
        >
          {nextLabel}
        </Button>

        <div className="rev-TimeTicker-value">{value}</div>

        <Button
          onClick={onDecrement}
          className="rev-TimeTicker-button rev-TimeTicker-button--previous"
        >
          {previousLabel}
        </Button>
      </div>
    )
  }
}

export default TimeTicker 