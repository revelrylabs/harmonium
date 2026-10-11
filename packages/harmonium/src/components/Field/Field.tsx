import * as React from 'react'
import {clsx} from 'clsx'
import {Field as BaseField} from '@base-ui/react/field'
import styles from './Field.module.css'

type FieldPart = 'label' | 'description' | 'error' | 'control'

export interface FieldContextValue {
  /**
   * The id the Field gives its control (and the `htmlFor` of `FieldLabel`).
   * A Harmonium control given its own `id` keeps it, and `FieldLabel`
   * follows that id instead.
   */
  fieldId: string
  /** Whether the field has an error */
  error?: boolean
  /** The id of the `FieldLabel` (its own `id` when you pass one) */
  labelId: string
  /** The id of the `FieldDescription`, when one is rendered (its own `id` when you pass one) */
  descriptionId?: string
  /** The id of the `FieldError`, when one is rendered (its own `id` when you pass one) */
  errorId?: string
  /**
   * Space-separated ids of the description and error parts that are actually
   * rendered, ready for `aria-describedby`. `undefined` when there are none.
   */
  describedBy?: string
  /** @internal Lets Field parts announce that they are mounted, and with which id */
  registerPart: (part: FieldPart, id: string, mounted: boolean) => void
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

/**
 * Registers a Field part, under the id it renders with, while it is mounted.
 * The Field links its control to these ids, so a part keeps working when the
 * consumer gives it its own `id`.
 */
function useRegisterPart(part: FieldPart, id: string | undefined, enabled: boolean) {
  const ctx = useFieldContext()
  const register = ctx?.registerPart
  useIsoLayoutEffect(() => {
    if (!register || !enabled || !id) return undefined
    register(part, id, true)
    return () => register(part, id, false)
  }, [register, part, id, enabled])
}

type FieldParts = Record<FieldPart, string[]>

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the field has an error */
  error?: boolean
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({error, className, children, ...props}, ref) => {
    const fieldId = React.useId()
    const [parts, setParts] = React.useState<FieldParts>({
      label: [],
      description: [],
      error: [],
      control: [],
    })

    const registerPart = React.useCallback(
      (part: FieldPart, id: string, mounted: boolean) => {
        setParts((prev) => {
          const ids = prev[part]
          if (mounted) return {...prev, [part]: [...ids, id]}
          // Remove one registration, so two parts sharing an id stay counted
          const index = ids.indexOf(id)
          if (index === -1) return prev
          return {...prev, [part]: [...ids.slice(0, index), ...ids.slice(index + 1)]}
        })
      },
      [],
    )

    const value = React.useMemo<FieldContextValue>(() => {
      const descriptionIds = unique(parts.description)
      const errorIds = unique(parts.error)
      const describedBy = [...descriptionIds, ...errorIds].join(' ') || undefined
      return {
        fieldId,
        error,
        labelId: parts.label[0] ?? `${fieldId}-label`,
        descriptionId: descriptionIds[0],
        errorId: errorIds[0],
        describedBy,
        registerPart,
        hasControl: parts.control.length > 0,
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

function unique(ids: string[]) {
  return Array.from(new Set(ids))
}

export type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({className, children, id, ...props}, ref) => {
    const ctx = useFieldContext()
    const labelId = id ?? (ctx ? `${ctx.fieldId}-label` : undefined)
    useRegisterPart('label', labelId, true)
    // Base UI points the label at Harmonium's controls (whatever their id).
    // A custom control built with useFieldContext uses `fieldId` instead.
    const htmlFor = ctx && !ctx.hasControl ? ctx.fieldId : undefined

    return (
      <BaseField.Label
        ref={ref}
        className={clsx(styles.label, className)}
        id={labelId}
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
>(({className, children, id, ...props}, ref) => {
  const ctx = useFieldContext()
  const descriptionId = id ?? (ctx ? `${ctx.fieldId}-description` : undefined)
  useRegisterPart('description', descriptionId, true)

  return (
    <BaseField.Description
      ref={ref}
      className={clsx(styles.description, className)}
      id={descriptionId}
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
  ({className, children, match, id, ...props}, ref) => {
    const ctx = useFieldContext()
    const content = hasContent(children)
    const resolvedMatch = match ?? (content ? true : undefined)
    const errorId = id ?? (ctx ? `${ctx.fieldId}-error` : undefined)
    // Only a message that is always shown can be registered up front; Base UI
    // links the validity-driven ones to the control itself.
    useRegisterPart('error', errorId, resolvedMatch === true)

    return (
      <BaseField.Error
        ref={ref as React.Ref<HTMLDivElement>}
        render={<p />}
        className={clsx(styles.error, className)}
        id={errorId}
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
  const ctx = useFieldContext()
  useRegisterPart('control', ctx?.fieldId, true)
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
