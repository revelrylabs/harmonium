import React from 'react'
import classNames from 'classnames'
import Icon from './Icon'

const BOOL_PROPS_TO_CLASS_NAMES = {
  small: ['rev-Button--small'],
  large: ['rev-Button--large'],

  primary: ['rev-Button--primary'],
  secondary: ['rev-Button--secondary'],
  inverted: ['rev-Button--inverted'],

  success: ['rev-Button--success'],
  warning: ['rev-Button--warning'],
  alert: ['rev-Button--alert'],
  disabled: ['rev-Button--disabled'],

  expanded: ['rev-Button--expanded'],

  dropdown: ['rev-Button--dropdown'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  tag?: string
  icon?: string
  className?: string
  children?: React.ReactNode
  small?: boolean
  large?: boolean
  primary?: boolean
  secondary?: boolean
  inverted?: boolean
  success?: boolean
  warning?: boolean
  alert?: boolean
  disabled?: boolean
  expanded?: boolean
  dropdown?: boolean
  href?: string
}

/**
 * Button component
 * @param props - Component props
 * @returns Button component
 */
const Button: React.FC<ButtonProps> = (props) => {
  // Extract props that will not pass through.
  const { className, children, tag, icon, ...passthrough } = props

  // Start building the className
  const boolClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (passthrough[name as keyof typeof passthrough]) {
      boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    // Don't delete classname props if they also need to pass through.
    if (!['disabled'].includes(name)) {
      delete passthrough[name as keyof typeof passthrough]
    }
  })

  // Of the props that WILL pass through, we need to use these.
  const { disabled, href } = passthrough

  // Finish building the className
  const buttonClassName = classNames(
    className,
    'rev-Button',
    boolClassNames,
    {
      disabled,
    }
  )

  // Modify underlying tag to suit props.
  const component = tag || (href ? 'a' : 'button')

  // Prepend icon if available
  let newChildren = children

  if (icon) {
    newChildren = [
      <Icon className="rev-Button-icon" key="icon" i={icon} />,
      ' ',
      ...(React.Children.toArray(children)),
    ]
  }

  // Finish
  return React.createElement(
    component,
    { ...passthrough, className: buttonClassName },
    newChildren
  )
}

export default Button 