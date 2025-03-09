import React from 'react'
import classNames from 'classnames'

export interface HelpTextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
}

/**
 * HelpText component for displaying help information
 * @param props - Component props
 * @returns HelpText component
 */
const HelpText: React.FC<HelpTextProps> = (props) => {
  const { className, children, ...passthrough } = props

  const newClassName = classNames(className, 'rev-HelpText')

  return (
    <small className={newClassName} {...passthrough}>
      {children}
    </small>
  )
}

export default HelpText 