import * as React from 'react'
import {clsx} from 'clsx'
import {useFieldContext} from '../Field'
import styles from './Textarea.module.css'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, ...props}, ref) => {
    const ctx = useFieldContext()

    return (
      <textarea
        ref={ref}
        className={clsx(styles.root, className)}
        id={ctx?.fieldId}
        aria-describedby={ctx ? `${ctx.fieldId}-description` : undefined}
        aria-errormessage={ctx?.error ? `${ctx.fieldId}-error` : undefined}
        aria-invalid={ctx?.error || undefined}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
