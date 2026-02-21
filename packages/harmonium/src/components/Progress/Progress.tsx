import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Progress.module.css'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value (0-100) */
  value?: number
  /** Maximum value */
  max?: number
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether to show the value label */
  showLabel?: boolean
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = 'primary',
      size = 'md',
      showLabel,
      className,
      ...props
    },
    ref,
  ) => {
    const percent = Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        <div className={styles.bar} style={{width: `${percent}%`}}>
          {showLabel && <span className={styles.label}>{Math.round(percent)}%</span>}
        </div>
      </div>
    )
  },
)

Progress.displayName = 'Progress'
