import React from 'react'
import classNames from 'classnames'
import HelpText from './HelpText'

export interface InputHelpTextProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  className?: string
}

/**
 * InputHelpText component for displaying help text in forms
 * @param props - Component props
 * @returns InputHelpText component or null if no children
 */
const InputHelpText: React.FC<InputHelpTextProps> = (props) => {
  const { children, className, ...passthrough } = props

  if (!children) {
    return null
  }

  const newClassName = classNames(className, 'rev-InputHelpText')

  return (
    <HelpText className={newClassName} {...passthrough}>
      {children}
    </HelpText>
  )
}

export default InputHelpText 