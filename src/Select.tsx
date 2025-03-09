import React from 'react'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export interface SelectOption {
  key?: string
  label: React.ReactNode
  value: string
  [key: string]: any
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[]
  error?: boolean | string
  className?: string
  children?: React.ReactNode
}

/**
 * Select component for dropdown selection
 * @param props - Component props
 * @returns Select component
 */
const Select: React.FC<SelectProps> & {
  Stack: React.FC<SelectStackProps>
  options: (options: SelectOption[]) => React.ReactNode
} = (props) => {
  const { children, options, className, error, ...passthrough } = props

  const inputClassName = classNames(className, 'rev-Select', {
    'is-invalid-input': !!error,
    'is-invalid': !!error,
  })

  return (
    <select className={inputClassName} {...passthrough}>
      {children}
      {options ? Select.options(options) : null}
    </select>
  )
}

/**
 * Generate option elements from option objects
 * @param options - Array of option objects
 * @returns Array of option elements
 */
Select.options = (options: SelectOption[]): React.ReactNode => {
  return options.map(({ key, label, value, ...props }) => (
    <option key={key || value} value={value} {...props}>
      {label}
    </option>
  ))
}

export interface SelectStackProps extends Omit<SelectProps, 'label'> {
  label?: string
  help?: string
  error?: boolean | string
  className?: string
  children?: React.ReactNode
}

/**
 * SelectStack component for select with label, help text, and error messages
 * @param props - Component props
 * @returns SelectStack component
 */
const SelectStack: React.FC<SelectStackProps> = (props) => {
  const { children, label, className, help, error, ...passthrough } = props

  const labelClassName = classNames(className, 'rev-SelectStack')

  return (
    <InputLabel className={labelClassName} error={error}>
      {label}
      <Select {...passthrough} error={error}>
        {children}
      </Select>
      <InputHelpText>{help}</InputHelpText>
      <InputErrors>{error}</InputErrors>
    </InputLabel>
  )
}

Select.Stack = SelectStack

export { SelectStack }
export default Select 