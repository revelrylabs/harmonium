import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Radio.module.css'

export interface RadioGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Legend/label for the radio group */
  legend?: React.ReactNode
}

export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({legend, className, children, ...props}, ref) => {
    return (
      <fieldset ref={ref} className={clsx(styles.group, className)} {...props}>
        {legend && <legend className={styles.legend}>{legend}</legend>}
        <div className={styles.options}>{children}</div>
      </fieldset>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: React.ReactNode
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({label, className, ...props}, ref) => {
    return (
      <label className={clsx(styles.root, className)}>
        <input ref={ref} type="radio" className={styles.input} {...props} />
        <span className={styles.indicator} aria-hidden="true" />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    )
  },
)

Radio.displayName = 'Radio'
