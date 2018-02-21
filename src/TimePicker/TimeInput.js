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
  useGoodTimeInput,
  formattedValue,
  isoValue,
  generation,
  ...props
}) => {
  return (
    <div>
      <Input
        {...props}
        className={className}
        type={useGoodTimeInput ? 'time' : 'text'}
        name={useGoodTimeInput ? name : null}
        defaultValue={formattedValue}
      />
      {useGoodTimeInput ? null : (
        <Input
          type="hidden"
          name={name}
          key={`${generation}:trueInput`}
          value={isoValue || ''}
          readOnly
        />
      )}
    </div>
  )
}

export default TimeInput
