import React from 'react'
import classNames from 'classnames'

export interface InputErrorsProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * InputErrors component for displaying form error messages
 * @param props - Component props
 * @returns InputErrors component or null if no children
 */
const InputErrors: React.FC<InputErrorsProps> = (props) => {
  const { children, className, ...passthrough } = props

  if (!children) {
    return null
  }

  const newClassName = classNames(
    className,
    'form-error',
    'is-visible',
    'rev-InputErrors'
  )

  return (
    <span className={newClassName} {...passthrough}>
      {children}
    </span>
  )
}

export default InputErrors 