import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Switch.module.css'

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'role' | 'size'> {
  /** Label text */
  label?: React.ReactNode
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({label, size = 'md', className, ...props}, ref) => {
    return (
      <label className={clsx(styles.root, className)} data-size={size}>
        <input ref={ref} type="checkbox" role="switch" className={styles.input} {...props} />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    )
  },
)

Switch.displayName = 'Switch'
