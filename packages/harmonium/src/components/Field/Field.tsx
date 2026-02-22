import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Field.module.css'

interface FieldContextValue {
  fieldId: string
  error?: boolean
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useFieldContext() {
  return React.useContext(FieldContext)
}

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the field has an error */
  error?: boolean
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({error, className, children, ...props}, ref) => {
    const fieldId = React.useId()

    return (
      <FieldContext.Provider value={{fieldId, error}}>
        <div
          ref={ref}
          className={clsx(styles.root, className)}
          data-error={error || undefined}
          {...props}
        >
          {children}
        </div>
      </FieldContext.Provider>
    )
  },
)

Field.displayName = 'Field'

export interface FieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({className, children, ...props}, ref) => {
    const ctx = useFieldContext()

    return (
      <label
        ref={ref}
        className={clsx(styles.label, className)}
        htmlFor={ctx?.fieldId}
        {...props}
      >
        {children}
      </label>
    )
  },
)

FieldLabel.displayName = 'FieldLabel'

export interface FieldDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(({className, children, ...props}, ref) => {
  const ctx = useFieldContext()

  return (
    <p
      ref={ref}
      className={clsx(styles.description, className)}
      id={ctx ? `${ctx.fieldId}-description` : undefined}
      {...props}
    >
      {children}
    </p>
  )
})

FieldDescription.displayName = 'FieldDescription'

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FieldError = React.forwardRef<
  HTMLParagraphElement,
  FieldErrorProps
>(({className, children, ...props}, ref) => {
  const ctx = useFieldContext()

  return (
    <p
      ref={ref}
      className={clsx(styles.error, className)}
      id={ctx ? `${ctx.fieldId}-error` : undefined}
      role="alert"
      {...props}
    >
      {children}
    </p>
  )
})

FieldError.displayName = 'FieldError'

export {useFieldContext}
