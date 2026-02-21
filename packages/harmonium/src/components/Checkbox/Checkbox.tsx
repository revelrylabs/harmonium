import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Checkbox.module.css'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: React.ReactNode
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({label, className, id, ...props}, ref) => {
    return (
      <label className={clsx(styles.root, className)}>
        <input ref={ref} type="checkbox" className={styles.input} id={id} {...props} />
        <span className={styles.indicator} aria-hidden="true" />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
