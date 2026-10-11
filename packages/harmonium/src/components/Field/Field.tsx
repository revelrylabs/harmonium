import * as React from 'react'
import {clsx} from 'clsx'
import {Field as BaseField} from '@base-ui/react/field'
import styles from './Field.module.css'

type FieldPart = 'description' | 'error' | 'control'

export interface FieldContextValue {
  /** The id given to the field's control (and the `htmlFor` of `FieldLabel`) */
  fieldId: string
  /** Whether the field has an error */
  error?: boolean
  /** The id of the `FieldLabel` */
  labelId: string
  /** The id of the `FieldDescription`, when one is rendered */
  descriptionId?: string
  /** The id of the `FieldError`, when one is rendered */
  errorId?: string
  /**
   * Space-separated ids of the description and error parts that are actually
   * rendered, ready for `aria-describedby`. `undefined` when there are none.
   */
  describedBy?: string
  /** @internal Lets Field parts announce that they are mounted */
  registerPart: (part: FieldPart, mounted: boolean) => void
  /** @internal Whether one of Harmonium's (Base UI-wired) controls is mounted */
  hasControl: boolean
}

const useIsoLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

const FieldContext = React.createContext<FieldContextValue | null>(null)

/**
 * Reads the surrounding `<Field>`, or `null` outside one. Use it to build your
 * own Field-aware control: put `fieldId` on the control, `describedBy` in its
 * `aria-describedby` and `error` in its `aria-invalid`. Harmonium's own
 * controls are wired up automatically.
 */
export function useFieldContext(): FieldContextValue | null {
  return React.useContext(FieldContext)
}

/** Registers a Field part while it is mounted. */
function useRegisterPart(part: FieldPart, enabled: boolean) {
  const ctx = useFieldContext()
  const register = ctx?.registerPart
  useIsoLayoutEffect(() => {
    if (!register || !enabled) return undefined
    register(part, true)
    return () => register(part, false)
  }, [register, part, enabled])
}

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the field has an error */
  error?: boolean
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({error, className, children, ...props}, ref) => {
    const fieldId = React.useId()
    const [parts, setParts] = React.useState<Record<FieldPart, number>>({
      description: 0,
      error: 0,
      control: 0,
    })

    const registerPart = React.useCallback(
      (part: FieldPart, mounted: boolean) => {
        setParts((prev) => ({...prev, [part]: prev[part] + (mounted ? 1 : -1)}))
      },
      [],
    )

    const value = React.useMemo<FieldContextValue>(() => {
      const descriptionId = parts.description > 0 ? `${fieldId}-description` : undefined
      const errorId = parts.error > 0 ? `${fieldId}-error` : undefined
      const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined
      return {
        fieldId,
        error,
        labelId: `${fieldId}-label`,
        descriptionId,
        errorId,
        describedBy,
        registerPart,
        hasControl: parts.control > 0,
      }
    }, [fieldId, error, parts, registerPart])

    return (
      <FieldContext.Provider value={value}>
        <BaseField.Root
          ref={ref}
          className={clsx(styles.root, className)}
          invalid={error || undefined}
          data-error={error || undefined}
          {...props}
        >
          {children}
        </BaseField.Root>
      </FieldContext.Provider>
    )
  },
)

Field.displayName = 'Field'

export type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({className, children, ...props}, ref) => {
    const ctx = useFieldContext()
    // Base UI points the label at Harmonium's controls (whatever their id).
    // A custom control built with useFieldContext uses `fieldId` instead.
    const htmlFor = ctx && !ctx.hasControl ? ctx.fieldId : undefined

    return (
      <BaseField.Label
        ref={ref}
        className={clsx(styles.label, className)}
        id={ctx?.labelId}
        {...(htmlFor ? {htmlFor} : null)}
        {...props}
      >
        {children}
      </BaseField.Label>
    )
  },
)

FieldLabel.displayName = 'FieldLabel'

export type FieldDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(({className, children, ...props}, ref) => {
  const ctx = useFieldContext()
  useRegisterPart('description', true)

  return (
    <BaseField.Description
      ref={ref}
      className={clsx(styles.description, className)}
      id={ctx ? `${ctx.fieldId}-description` : undefined}
      {...props}
    >
      {children}
    </BaseField.Description>
  )
})

FieldDescription.displayName = 'FieldDescription'

export interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * When to show the message. By default it shows whenever it has content,
   * so `<FieldError>{errors.email}</FieldError>` renders nothing while there is
   * no error. Without children it shows the browser's validation message once
   * the control is invalid. Pass a `ValidityState` key (e.g. `"valueMissing"`)
   * to show it only for that failure.
   */
  match?: boolean | keyof ValidityState
}

function hasContent(node: React.ReactNode) {
  return node !== undefined && node !== null && node !== false && node !== ''
}

export const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({className, children, match, ...props}, ref) => {
    const ctx = useFieldContext()
    const content = hasContent(children)
    const resolvedMatch = match ?? (content ? true : undefined)
    // Only a message that is always shown can be registered up front; Base UI
    // links the validity-driven ones to the control itself.
    useRegisterPart('error', resolvedMatch === true)

    return (
      <BaseField.Error
        ref={ref as React.Ref<HTMLDivElement>}
        render={<p />}
        className={clsx(styles.error, className)}
        id={ctx ? `${ctx.fieldId}-error` : undefined}
        role="alert"
        match={resolvedMatch}
        {...props}
        {...(content ? {children} : null)}
      />
    )
  },
)

FieldError.displayName = 'FieldError'

/**
 * Marks the Field's control as one wired up by Base UI, so FieldLabel's
 * `htmlFor` follows Base UI instead of defaulting to `fieldId`.
 * @internal
 */
export function useRegisterFieldControl() {
  useRegisterPart('control', true)
}

/**
 * Props every native Field-aware control (Input, Textarea, Select, ...) adds on
 * top of what Base UI's `Field.Control` wires up: the Field's id (so
 * `useFieldContext().fieldId` is the control's id) and `aria-errormessage`
 * when a `FieldError` is rendered.
 * @internal
 */
export function useFieldControlProps(id: string | undefined) {
  const ctx = useFieldContext()
  useRegisterFieldControl()
  return {
    id: id ?? ctx?.fieldId,
    'aria-errormessage': ctx?.error ? ctx.errorId : undefined,
  }
}
