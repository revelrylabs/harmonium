import React, { useRef, useEffect } from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  small: ['rev-Card--small'],
  large: ['rev-Card--large'],
  primary: ['rev-Card--primary'],
  secondary: ['rev-Card--secondary'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface CardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  getCalendarRef?: (ref: HTMLDivElement) => void
  small?: boolean
  large?: boolean
  primary?: boolean
  secondary?: boolean
}

/**
 * CardLayout component for card container layouts
 * @param props - Component props
 * @returns CardLayout component
 */
const CardLayout: React.FC<CardLayoutProps> & {
  Bar: React.FC<CardLayoutBarProps>
  Fill: React.FC<CardLayoutFillProps>
} = (props) => {
  const { className, children, getCalendarRef, ...passthrough } = props
  const calendarRef = useRef<HTMLDivElement>(null)

  // If getCalendarRef is provided, pass the ref when available
  useEffect(() => {
    if (getCalendarRef && calendarRef.current) {
      getCalendarRef(calendarRef.current)
    }
  }, [getCalendarRef, calendarRef.current])

  // Start building the className
  const boolClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (passthrough[name as keyof typeof passthrough]) {
      boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete passthrough[name as keyof typeof passthrough]
  })

  const divClassName = classNames(className, 'rev-CardLayout', boolClassNames)

  return (
    <div
      {...passthrough}
      className={divClassName}
      ref={calendarRef}
    >
      {children}
    </div>
  )
}

export interface CardLayoutBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * CardLayoutBar component for card bar sections
 * @param props - Component props
 * @returns CardLayoutBar component
 */
const CardLayoutBar: React.FC<CardLayoutBarProps> = (props) => {
  const { className, children, ...passthrough } = props
  const divClassName = classNames(className, 'rev-CardLayout-bar')

  return (
    <div {...passthrough} className={divClassName}>
      {children}
    </div>
  )
}

export interface CardLayoutFillProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * CardLayoutFill component for card fill sections
 * @param props - Component props
 * @returns CardLayoutFill component
 */
const CardLayoutFill: React.FC<CardLayoutFillProps> = (props) => {
  const { className, children, ...passthrough } = props
  const divClassName = classNames(className, 'rev-CardLayout-fill')

  return (
    <div {...passthrough} className={divClassName}>
      {children}
    </div>
  )
}

CardLayout.Bar = CardLayoutBar
CardLayout.Fill = CardLayoutFill

export { CardLayoutBar, CardLayoutFill }
export default CardLayout 