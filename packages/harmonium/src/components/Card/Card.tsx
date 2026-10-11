import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Card.module.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: 'elevated' | 'outlined' | 'filled'
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

/**
 * A content container, with optional `CardHeader`, `CardBody` and
 * `CardFooter` sections.
 *
 * @category Display
 * @example
 * <Card variant="outlined">
 *   <CardHeader>Plan</CardHeader>
 *   <CardBody>You're on the free plan.</CardBody>
 *   <CardFooter><Button size="sm">Upgrade</Button></CardFooter>
 * </Card>
 */
export const Card =React.forwardRef<HTMLDivElement, CardProps>(
  ({variant = 'elevated', padding = 'md', className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-variant={variant}
        data-padding={padding}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

export type CardSectionProps = React.HTMLAttributes<HTMLDivElement>

/** The top section of a `Card`, usually its title. */
export const CardHeader =React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.header, className)} {...props}>
      {children}
    </div>
  ),
)
CardHeader.displayName = 'CardHeader'

/** The main content of a `Card`. */
export const CardBody =React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.body, className)} {...props}>
      {children}
    </div>
  ),
)
CardBody.displayName = 'CardBody'

/** The bottom section of a `Card`, usually actions. */
export const CardFooter =React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.footer, className)} {...props}>
      {children}
    </div>
  ),
)
CardFooter.displayName = 'CardFooter'
