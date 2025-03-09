import React from 'react'
import classNames from 'classnames'
import Icon from './Icon'

const PROP_NAME_TO_CLASS_NAME = {
  primary: ['rev-Badge--primary'],
  secondary: ['rev-Badge--secondary'],
  tertiary: ['rev-Badge--tertiary'],
  accent: ['rev-Badge--accent'],
  alert: ['rev-Badge--alert'],
  warning: ['rev-Badge--warning'],
  success: ['rev-Badge--success'],
}

const PROP_NAMES = Object.keys(PROP_NAME_TO_CLASS_NAME)

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: string
  primary?: boolean
  secondary?: boolean
  tertiary?: boolean
  accent?: boolean
  alert?: boolean
  warning?: boolean
  success?: boolean
}

/**
 * Badge component for displaying small counts, labels, or statuses
 */
const Badge: React.FC<BadgeProps> = ({
  className,
  children,
  icon,
  ...props
}) => {
  const propClassNames: string[] = []

  PROP_NAMES.forEach((name) => {
    if (props[name as keyof typeof props]) {
      propClassNames.push(...PROP_NAME_TO_CLASS_NAME[name as keyof typeof PROP_NAME_TO_CLASS_NAME])
      delete props[name as keyof typeof props]
    }
  })

  const newClassName = classNames(className, 'rev-Badge', propClassNames)

  return (
    <span {...props} className={newClassName}>
      {icon ? <Icon i={icon} className="rev-Badge-icon" /> : null} {children}
    </span>
  )
}

export default Badge 