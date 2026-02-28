import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Typography.module.css'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Text size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Font weight */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  /** Text color */
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error'
  /** Whether to truncate overflow with ellipsis */
  truncate?: boolean
  /** Rendered HTML element */
  as?: 'p' | 'span' | 'div' | 'label'
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      size = 'md',
      weight,
      color,
      truncate,
      as = 'p',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as as React.ElementType

    return (
      <Component
        ref={ref}
        className={clsx(styles.text, className)}
        data-size={size}
        data-weight={weight || undefined}
        data-color={color || undefined}
        data-truncate={truncate || undefined}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

Text.displayName = 'Text'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (renders h1–h6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Visual size (independent of semantic level) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({level = 2, size, className, children, ...props}, ref) => {
    const Component = `h${level}` as const
    const visualSize = size ?? defaultSizeForLevel(level)

    return (
      <Component
        ref={ref}
        className={clsx(styles.heading, className)}
        data-size={visualSize}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

Heading.displayName = 'Heading'

function defaultSizeForLevel(level: number): string {
  const map: Record<number, string> = {
    1: '4xl',
    2: '3xl',
    3: '2xl',
    4: 'xl',
    5: 'lg',
    6: 'md',
  }
  return map[level] ?? 'md'
}
