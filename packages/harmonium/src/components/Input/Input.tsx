import * as React from 'react'
import {clsx} from 'clsx'
import {useFieldContext} from '../Field'
import styles from './Input.module.css'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Size variant */
  inputSize?: 'sm' | 'md' | 'lg'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({inputSize = 'md', className, ...props}, ref) => {
    const ctx = useFieldContext()

    return (
      <input
        ref={ref}
        className={clsx(styles.root, className)}
        id={ctx?.fieldId}
        aria-describedby={ctx ? `${ctx.fieldId}-description` : undefined}
        aria-errormessage={ctx?.error ? `${ctx.fieldId}-error` : undefined}
        aria-invalid={ctx?.error || undefined}
        data-size={inputSize}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
