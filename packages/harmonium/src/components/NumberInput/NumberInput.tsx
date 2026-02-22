import * as React from 'react'
import {clsx} from 'clsx'
import {useFieldContext} from '../Field'
import styles from './NumberInput.module.css'

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange' | 'value' | 'defaultValue'> {
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
  /** Change handler */
  onChange?: (value: number) => void
}

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
      className,
      ...props
    },
    ref,
  ) => {
    const [internal, setInternal] = React.useState(defaultValue)
    const value = controlledValue ?? internal
    const ctx = useFieldContext()

    const clamp = (val: number) => {
      let result = val
      if (min !== undefined) result = Math.max(min, result)
      if (max !== undefined) result = Math.min(max, result)
      return result
    }

    const update = (next: number) => {
      const clamped = clamp(next)
      if (controlledValue === undefined) setInternal(clamped)
      onChange?.(clamped)
    }

    return (
      <div className={clsx(styles.root, className)} data-size={size}>
        <button
          type="button"
          className={styles.button}
          onClick={() => update(value - step)}
          disabled={min !== undefined && value <= min}
          aria-label="Decrease"
          tabIndex={-1}
        >
          &minus;
        </button>
        <input
          ref={ref}
          type="number"
          className={styles.input}
          id={ctx?.fieldId}
          aria-describedby={ctx ? `${ctx.fieldId}-description` : undefined}
          aria-errormessage={ctx?.error ? `${ctx.fieldId}-error` : undefined}
          aria-invalid={ctx?.error || undefined}
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(event) => update(Number(event.target.value))}
          {...props}
        />
        <button
          type="button"
          className={styles.button}
          onClick={() => update(value + step)}
          disabled={max !== undefined && value >= max}
          aria-label="Increase"
          tabIndex={-1}
        >
          +
        </button>
      </div>
    )
  },
)

NumberInput.displayName = 'NumberInput'
