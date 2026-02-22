import * as React from 'react'
import {clsx} from 'clsx'
import {useFieldContext} from '../Field'
import styles from './DatePicker.module.css'

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({size = 'md', className, ...props}, ref) => {
    const ctx = useFieldContext()

    return (
      <input
        ref={ref}
        type="date"
        className={clsx(styles.root, className)}
        id={ctx?.fieldId}
        aria-describedby={ctx ? `${ctx.fieldId}-description` : undefined}
        aria-errormessage={ctx?.error ? `${ctx.fieldId}-error` : undefined}
        aria-invalid={ctx?.error || undefined}
        data-size={size}
        {...props}
      />
    )
  },
)

DatePicker.displayName = 'DatePicker'
