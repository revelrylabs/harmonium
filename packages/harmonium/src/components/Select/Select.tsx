import * as React from 'react'
import {clsx} from 'clsx'
import {useFieldContext} from '../Field'
import styles from './Select.module.css'

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Placeholder option text */
  placeholder?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({placeholder, size = 'md', className, children, ...props}, ref) => {
    const ctx = useFieldContext()

    return (
      <select
        ref={ref}
        className={clsx(styles.root, className)}
        id={ctx?.fieldId}
        aria-describedby={ctx ? `${ctx.fieldId}-description` : undefined}
        aria-errormessage={ctx?.error ? `${ctx.fieldId}-error` : undefined}
        aria-invalid={ctx?.error || undefined}
        data-size={size}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    )
  },
)

Select.displayName = 'Select'
