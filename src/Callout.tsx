import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  secondary: ['secondary', 'rev-Callout--secondary'],
  primary: ['primary', 'rev-Callout--primary'],
  success: ['success', 'rev-Callout--success'],
  warning: ['warning', 'rev-Callout--warning'],
  alert: ['alert', 'rev-Callout--alert'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  secondary?: boolean
  primary?: boolean
  success?: boolean
  warning?: boolean
  alert?: boolean
}

/**
 * Callout component for highlighted content
 * @param props - Component props
 * @returns Callout component
 */
const Callout: React.FC<CalloutProps> = (props) => {
  const { className, children, ...passthrough } = props

  const boolClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (passthrough[name as keyof typeof passthrough]) {
      boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete passthrough[name as keyof typeof passthrough]
  })

  const divClassName = classNames(className, 'rev-Callout', boolClassNames)

  return (
    <div {...passthrough} className={divClassName}>
      {children}
    </div>
  )
}

export default Callout 