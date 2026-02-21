import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Badge.module.css'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({variant = 'neutral', size = 'md', className, children, ...props}, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.root, className)}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
