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
  
  render () {
    const {
      className,
      ...props
    } = this.props

    return (
      <div {...props} className={`rev-TimeTicker ${className}`}>
        <Button className="rev-TimeTicker-button--previous">
        </Button>

        <div className="rev-TimeTicker-value">
          {/* current enum value */}
        </div>

        <Button className="rev-TimeTicker-button--next">
        </Button>
      </div>
    )
  }
}

export default TimeTicker
