/** @jsx createElement */

import classNames from 'classnames'
import React, { createElement } from 'react'
import Input from '../Input'

/**
 * A component which increments or decrements a unit of time,
 * e.g. (01-12 for hours, 00-59 for minutes, and AM/PM)
 * @param {object} props - the props of the TimeTicker
 */
const TimeTicker = ({
  className,
  ...props
}) => {
  return (
    <div>
      TimeTicker
    </div>
  )
}

export default TimeTicker
