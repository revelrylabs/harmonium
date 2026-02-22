import * as React from 'react'
import {clsx} from 'clsx'
import {useFieldContext} from '../Field'
import styles from './TimePicker.module.css'

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({size = 'md', className, ...props}, ref) => {
    const ctx = useFieldContext()

    return (
      <input
        ref={ref}
        type="time"
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

TimePicker.displayName = 'TimePicker'
