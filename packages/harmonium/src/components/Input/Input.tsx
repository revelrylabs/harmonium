import * as React from 'react'
import {clsx} from 'clsx'
import {useFieldContext} from '../Field'
import styles from './Input.module.css'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({size = 'md', className, ...props}, ref) => {
    const ctx = useFieldContext()

    return (
      <input
        ref={ref}
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

Input.displayName = 'Input'
