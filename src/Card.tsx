import React from 'react'
import CardLayout from './CardLayout'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  getCalendarRef?: (ref: HTMLDivElement) => void
  small?: boolean
  large?: boolean
  primary?: boolean
  secondary?: boolean
}

/**
 * Card component for displaying content in a card format
 * @param props - Component props
 * @returns Card component
 */
const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>
  Footer: React.FC<CardFooterProps>
  Body: React.FC<CardBodyProps>
} = (props) => {
  const { className = '', children, ...passthrough } = props

  return (
    <CardLayout {...passthrough} className={`rev-Card ${className}`}>
      {children}
    </CardLayout>
  )
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * CardHeader component for card headers
 * @param props - Component props
 * @returns CardHeader component
 */
const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const { className = '', children } = props

  return (
    <CardLayout.Bar className={`rev-Card-header ${className}`}>
      {children}
    </CardLayout.Bar>
  )
}
Card.Header = CardHeader

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * CardFooter component for card footers
 * @param props - Component props
 * @returns CardFooter component
 */
const CardFooter: React.FC<CardFooterProps> = (props) => {
  const { className = '', children } = props

  return (
    <CardLayout.Bar className={`rev-Card-footer ${className}`}>
      {children}
    </CardLayout.Bar>
  )
}
Card.Footer = CardFooter

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * CardBody component for card body content
 * @param props - Component props
 * @returns CardBody component
 */
const CardBody: React.FC<CardBodyProps> = (props) => {
  const { className = '', children } = props

  return (
    <CardLayout.Bar className={`rev-Card-body ${className}`}>
      {children}
    </CardLayout.Bar>
  )
}
Card.Body = CardBody

export { CardHeader, CardFooter, CardBody }
export default Card 