import * as React from 'react'
import {clsx} from 'clsx'
import {NumberField} from '@base-ui/react/number-field'
import {mergeProps} from '@base-ui/react/merge-props'
import {useFieldContext, useRegisterFieldControl} from '../Field/Field'
import styles from './NumberInput.module.css'

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size' | 'onChange' | 'value' | 'defaultValue'
  > {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Step increment */
  step?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Controlled value */
  value?: number
  /** Default value */
  defaultValue?: number
  /**
   * Change handler. Called with finite numbers only: while typing it gets the
   * typed number as-is; out-of-range values are clamped to `min`/`max` when
   * the input loses focus or Enter is pressed. Clearing the input doesn't call
   * it.
   */
  onChange?: (value: number) => void
  /** Accessible label of the decrement button */
  decrementLabel?: string
  /** Accessible label of the increment button */
  incrementLabel?: string
}

const STEP_REASONS = new Set(['increment-press', 'decrement-press', 'keyboard', 'wheel', 'scrub'])

function decimalPlaces(n: number) {
  if (!Number.isFinite(n)) return 0
  const [mantissa, exponent] = String(n).split('e')
  const fraction = mantissa.split('.')[1]?.length ?? 0
  return Math.max(0, fraction - Number(exponent ?? 0))
}

/** Rounds away float noise from stepping (0.1 + 0.2) to the step's precision. */
function roundToStep(value: number, step: number, from: number | null) {
  const places = Math.max(decimalPlaces(step), decimalPlaces(from ?? 0))
  return Number(value.toFixed(Math.min(places, 20)))
}

// No digit grouping (like a native number input); no display rounding.
const FORMAT: Intl.NumberFormatOptions = {useGrouping: false, maximumFractionDigits: 20}

/**
 * A number input with decrement and increment buttons. Arrow keys step by
 * `step`; typed values are clamped to `min`/`max` on blur or Enter.
 *
 * Built on Base UI's NumberField. The
 * visible input is a text field with `role="spinbutton"`; a hidden
 * `<input type="number">` carries `name`/`value` for form submission.
 *
 * Prop routing: `className` goes on the root `<div>`; `id`, `name`, `form`,
 * `disabled`, `readOnly` and `required` configure the field (and reach the
 * stepper buttons); `ref` and every other attribute go on the visible input.
 *
 * @category Forms
 * @example
 * <Field>
 *   <FieldLabel>Quantity</FieldLabel>
 *   <NumberInput min={1} max={10} value={qty} onChange={setQty} />
 * </Field>
 */
export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      size = 'md',
      step = 1,
      min,
      max,
      value: controlledValue,
      defaultValue = 0,
      onChange,
      decrementLabel = 'Decrease',
      incrementLabel = 'Increase',
      className,
      id,
      name,
      form,
      disabled,
      readOnly,
      required,
      ...props
    },
    ref,
  ) => {
    const ctx = useFieldContext()
    useRegisterFieldControl()
    const [internal, setInternal] = React.useState<number | null>(defaultValue)
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internal

    const clamp = (n: number) => {
      let result = n
      if (min !== undefined) result = Math.max(min, result)
      if (max !== undefined) result = Math.min(max, result)
      return result
    }

    const emit = (next: number) => {
      if (!isControlled) setInternal(next)
      if (next !== value) onChange?.(next)
    }

    const handleValueChange = (
      next: number | null,
      details: NumberField.Root.ChangeEventDetails,
    ) => {
      if (next === null || !Number.isFinite(next)) {
        if (!isControlled) setInternal(null)
        return
      }
      // Typed values are reported as-is; clamping waits for commit.
      emit(STEP_REASONS.has(details.reason) ? clamp(roundToStep(next, step, value)) : next)
    }

    // Blur and Enter commit typed text: clamp it now. (In-range values were
    // already reported by handleValueChange.)
    const handleValueCommitted = (next: number | null) => {
      if (next === null || !Number.isFinite(next)) return
      const clamped = clamp(next)
      if (clamped !== next) emit(clamped)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter' || value === null || clamp(value) === value) return
      // Base UI commits typed text on blur; round-trip focus so Enter commits
      // (and clamps) too, before the form is submitted.
      const input = event.currentTarget
      input.blur()
      input.focus()
    }

    return (
      <NumberField.Root
        className={clsx(styles.root, className)}
        data-size={size}
        id={id ?? ctx?.fieldId}
        name={name}
        form={form}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleValueChange}
        onValueCommitted={handleValueCommitted}
        allowOutOfRange
        format={FORMAT}
      >
        <NumberField.Decrement className={styles.button} aria-label={decrementLabel}>
          &minus;
        </NumberField.Decrement>
        <NumberField.Input
          ref={ref}
          className={styles.input}
          role="spinbutton"
          aria-valuenow={value ?? undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-errormessage={ctx?.error ? ctx.errorId : undefined}
          // The consumer's onKeyDown runs first; event.preventBaseUIHandler()
          // skips the Enter commit below
          {...(mergeProps<'input'>(
            {onKeyDown: handleKeyDown},
            props as React.ComponentProps<'input'>,
          ) as NumberField.Input.Props)}
        />
        <NumberField.Increment className={styles.button} aria-label={incrementLabel}>
          +
        </NumberField.Increment>
      </NumberField.Root>
    )
  },
)

NumberInput.displayName = 'NumberInput'
