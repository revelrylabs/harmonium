import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  small: ['rev-ButtonGroup--small'],
  large: ['rev-ButtonGroup--large'],

  primary: ['rev-ButtonGroup--primary'],
  secondary: ['rev-ButtonGroup--secondary'],
  inverted: ['rev-ButtonGroup--inverted'],

  success: ['rev-ButtonGroup--success'],
  warning: ['rev-ButtonGroup--warning'],
  alert: ['rev-ButtonGroup--alert'],
  disabled: ['rev-ButtonGroup--disabled'],

  expanded: ['rev-ButtonGroup--expanded'],

  stackedForSmall: ['rev-ButtonGroup--stackedForSmall'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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
  stackedForSmall?: boolean
}

/**
 * ButtonGroup component for grouping buttons
 * @param props - Component props
 * @returns ButtonGroup component
 */
const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { className, children, ...passthrough } = props

  const boolClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (passthrough[name as keyof typeof passthrough]) {
      boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete passthrough[name as keyof typeof passthrough]
  })

  const divClassName = classNames(
    className,
    'rev-ButtonGroup',
    boolClassNames
  )

  return (
    <div {...passthrough} className={divClassName}>
      {children}
    </div>
  )
}

export default ButtonGroup 