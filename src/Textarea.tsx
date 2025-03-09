import React from 'react'
import InputLabel from './InputLabel'
import classNames from 'classnames'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string
  className?: string
}

/**
 * Textarea component for multi-line text input
 * @param props - Component props
 * @returns Textarea component
 */
const Textarea: React.FC<TextareaProps> & {
  Stack: React.FC<TextareaStackProps>
} = (props) => {
  const { className, error, ...passthrough } = props
  const inputClassName = classNames(className, 'rev-Textarea', {
    'is-invalid-input': !!error,
    'is-invalid': !!error,
  })

  return <textarea className={inputClassName} {...passthrough} />
}

export interface TextareaStackProps extends TextareaProps {
  help?: string
  label?: string
}

/**
 * TextareaStack component for textarea with label, help text, and error messages
 * @param props - Component props
 * @returns TextareaStack component
 */
const TextareaStack: React.FC<TextareaStackProps> = (props) => {
  const { error, help, className, label, ...passthrough } = props

  const labelClassName = classNames(className, 'rev-TextareaStack')

  return (
    <InputLabel className={labelClassName} error={error}>
      {label}
      <Textarea {...passthrough} error={error} />
      <InputHelpText>{help}</InputHelpText>
      <InputErrors>{error}</InputErrors>
    </InputLabel>
  )
}

Textarea.Stack = TextareaStack

export { TextareaStack }
export default Textarea 