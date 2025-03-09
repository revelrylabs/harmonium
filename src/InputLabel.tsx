import React from 'react'
import classNames from 'classnames'

export interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean | string
  inputId?: string
  className?: string
  children?: React.ReactNode
}

/**
 * InputLabel component for form labels
 * @param props - Component props
 * @returns InputLabel component
 */
const InputLabel: React.FC<InputLabelProps> = (props) => {
  const { error, className, children, inputId, ...passthrough } = props

  const labelClassName = classNames(className, 'rev-InputLabel', {
    'is-invalid-label': !!error,
    'is-invalid': !!error,
  })

  return (
    <label htmlFor={inputId} className={labelClassName} {...passthrough}>
      {children}
    </label>
  )
}

export default InputLabel 