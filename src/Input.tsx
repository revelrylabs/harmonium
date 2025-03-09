import React from 'react'
import classNames from 'classnames'
import { uniqueId } from 'lodash'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string
  inputRef?: React.Ref<HTMLInputElement>
  id?: string
  className?: string
}

/**
 * Input component for forms
 * @param props - Component props
 * @returns Input component
 */
const Input: React.FC<InputProps> & {
  Stack: React.FC<InputStackProps>
} = (props) => {
  const { id, className, error, inputRef, ...passthrough } = props
  
  const inputClassName = classNames(className, 'rev-Input', {
    'is-invalid-input': !!error,
    'is-invalid': !!error,
  })
  
  return (
    <input 
      id={id} 
      className={inputClassName} 
      ref={inputRef} 
      {...passthrough} 
    />
  )
}

export interface InputStackProps extends Omit<InputProps, 'id'> {
  error?: boolean | string
  help?: string
  label?: string
  className?: string
}

/**
 * InputStack component for grouping Input with label, help text, and errors
 * @param props - Component props
 * @returns InputStack component
 */
const InputStack: React.FC<InputStackProps> = (props) => {
  const { error, help, className, label, ...passthrough } = props
  
  const labelClassName = classNames(className, 'rev-InputStack')
  const inputId = uniqueId('Input:')

  return (
    <InputLabel className={labelClassName} error={error} inputId={inputId}>
      {label}
      <Input {...passthrough} error={error} id={inputId} />
      <InputHelpText>{help}</InputHelpText>
      <InputErrors>{error}</InputErrors>
    </InputLabel>
  )
}

Input.Stack = InputStack
Input.defaultProps = {
  type: 'text',
}

export default Input 