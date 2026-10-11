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
    // A non-positive or non-numeric max would divide by zero (NaN%), so the
    // bar is treated as empty
    const hasRange = Number.isFinite(max) && max > 0
    const now = hasRange && Number.isFinite(value) ? Math.min(max, Math.max(0, value)) : 0
    const percent = hasRange ? (now / max) * 100 : 0

    const bar = (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        role="progressbar"
        aria-valuenow={now}
        aria-valuemin={0}
        aria-valuemax={hasRange ? max : 0}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        <div className={styles.bar} style={{width: `${percent}%`}} />
      </div>
    )

    if (!showLabel) return bar

    // The label sits after the track, not inside the bar, so it stays legible
    // at low values (an inner label is clipped or runs off a narrow bar).
    return (
      <>
        {bar}
        <span className={styles.label} aria-hidden="true">
          {Math.round(percent)}%
        </span>
      </>
    )
  },
)

Progress.displayName = 'Progress'
