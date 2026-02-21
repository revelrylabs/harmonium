import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Spinner.module.css'

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg'
  /** Accessible label */
  label?: string
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({size = 'md', label = 'Loading', className, ...props}, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.root, className)}
        data-size={size}
        role="status"
        aria-label={label}
        {...props}
      >
        <span className={styles.circle} />
      </span>
    )
  },
)

Spinner.displayName = 'Spinner'
