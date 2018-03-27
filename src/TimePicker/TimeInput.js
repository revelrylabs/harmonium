/** @jsx createElement */

import classNames from 'classnames'
import React, {createElement} from 'react'
import Input from '../Input'

/**
 * A component which contains the input for a TimePicker.
 * @param {object} props - the props of the TimeInput
 */
const TimeInput = ({
  className,
  error,
  useGoodTimeInput,
  showSeconds,
  formattedValue,
  isoValue,
  generation,
  ...props
}) => {
  const inputClassName = classNames(className, 'rev-TimePicker-input', {
    'is-invalid-input': !!error,
    'is-invalid': !!error,
  })

  return (
    <div>
      <Input
        {...props}
        className={className}
        step={showSeconds ? '1' : null}
        type="time"
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
