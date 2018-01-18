/** @jsx createElement */

import classNames from 'classnames'
import React from 'react'
import Input from '../Input'
import createElementWithOverride from '../Utilities/createElementWithOverride'

const DateInputBlock = ({
  error,
  className,
  goodDateInput,
  generation,
  overrides,
  dateFormat,
  isoValue,
  formattedValue,
  name,
  ...props
}) => {
  const createElement = createElementWithOverride.bind(this, overrides)
  const inputClassName = classNames(className, 'rev-DatePicker-input', {
    'is-invalid-input': !!error,
    'is-invalid': !!error
  })

  return (
    <div>
      <Input
        {...props}
        className={inputClassName}
        type={goodDateInput ? 'date' : 'text'}
        name={goodDateInput ? name : null}
        defaultValue={formattedValue}
      />
      {goodDateInput ? null : (
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

export default DateInputBlock
