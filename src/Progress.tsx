import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  primary: ['rev-Progress--primary'],
  secondary: ['rev-Progress--secondary'],
  tertiary: ['rev-Progress--tertiary'],
  accent: ['rev-Progress--accent'],
  success: ['rev-Progress--success'],
  warning: ['rev-Progress--warning'],
  alert: ['rev-Progress--alert'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  min?: number
  max?: number
  value?: number
  className?: string
  children?: React.ReactNode
  primary?: boolean
  secondary?: boolean
  tertiary?: boolean
  accent?: boolean
  success?: boolean
  warning?: boolean
  alert?: boolean
}

/**
 * Progress component for displaying progress bars
 * @param props - Component props
 * @returns Progress component
 */
const Progress: React.FC<ProgressProps> = (props) => {
  const {
    className,
    children,
    min = 0,
    max = 100,
    value = 0,
    ...passthrough
  } = props

  const boolClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (passthrough[name as keyof typeof passthrough]) {
      boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete passthrough[name as keyof typeof passthrough]
  })

  const divClassName = classNames(
    className,
    'progress',
    'rev-Progress',
    boolClassNames
  )

  const ratio = Math.min(1, (value - min) / (max - min))
  const width = `${ratio * 100}%`

  const text = children ? (
    <div className="rev-Progress-text">{children}</div>
  ) : null

  return (
    <div {...passthrough} className={divClassName}>
      <div className="rev-Progress-track">
        <div className="rev-Progress-track-amount" style={{ width }} />
      </div>
      {text}
    </div>
  )
}

export default Progress 