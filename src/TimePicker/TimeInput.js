/** @jsx createElement */

import classNames from 'classnames'
import React, { createElement } from 'react'
import Input from '../Input'

/**
 * A component which contains the input for a TimePicker.
 * @param {object} props - the props of the TimeInput
 */
const TimeInput = ({
  className,
  goodTimeInput,
  name,
  ...props
}) => {
  return (
    <Input
      {...props}
      className="rev-TimePicker-input"
      type={goodTimeInput ? 'time' : 'text'}
      name={name}
    />
  )
}

export default TimeInput
