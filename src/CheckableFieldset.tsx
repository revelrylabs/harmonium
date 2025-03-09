import React from 'react'
import classNames from 'classnames'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export interface CheckableFieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label?: string
  help?: string
  error?: boolean | string
  className?: string
  children?: React.ReactNode
}

/**
 * CheckableFieldset component for grouping checkable inputs
 * @param props - Component props
 * @returns CheckableFieldset component
 */
const CheckableFieldset: React.FC<CheckableFieldsetProps> = (props) => {
  const { label, className, children, help, error, ...passthrough } = props

  const fieldsetClassName = classNames(
    className,
    'fieldset',
    'rev-CheckableFieldset',
    {
      'is-invalid-fieldset': !!error,
    }
  )

  const legendClassName = classNames({
    'is-invalid-label': !!error,
  })

  return (
    <div>
      <fieldset {...passthrough} className={fieldsetClassName}>
        {label ? <legend className={legendClassName}>{label}</legend> : null}
        {children}
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
      </fieldset>
    </div>
  )
}

export default CheckableFieldset 