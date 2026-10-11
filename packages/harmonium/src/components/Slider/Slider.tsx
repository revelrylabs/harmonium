import * as React from 'react'
import {clsx} from 'clsx'
import {Slider as BaseSlider} from '@base-ui/react/slider'
import {createChangeEvent, useMergedRef} from '../../utils/hiddenInput'
import {useRegisterFieldControl} from '../Field/Field'
import styles from './Slider.module.css'

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Whether to show the current value label */
  showValue?: boolean
}

function toNumber(value: unknown, fallback: number) {
  const n = typeof value === 'number' ? value : Number(value)
  return value === undefined || value === '' || !Number.isFinite(n) ? fallback : n
}

/**
 * The value a native `<input type="range">` starts at: the midpoint of
 * `min`/`max`, aligned to `step`.
 */
function rangeDefault(min: number, max: number, step: number) {
  if (max < min) return min
  const mid = min + (max - min) / 2
  if (!(step > 0)) return mid
  let value = min + Math.round((mid - min) / step) * step
  if (value > max) value -= step
  return Number(value.toPrecision(12))
}

/**
 * A slider built on Base UI's Slider. Keyboard, pointer and screen-reader
 * support come from Base UI; a visually hidden `<input type="range">` inside
 * the thumb carries `name`/`value` for form submission.
 *
 * Prop routing: `ref`, `aria-label`, `aria-labelledby`, `aria-describedby`,
 * `aria-valuetext`, `onFocus`, `onBlur`, `onKeyDown` and `tabIndex` go to that
 * range input; `onChange` receives a change event whose `target` is that
 * input; `className`, `style`, `id` and other attributes go on the root
 * `<div>`.
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      size = 'md',
      showValue,
      className,
      value,
      defaultValue,
      onChange,
      min: minProp,
      max: maxProp,
      step: stepProp,
      name,
      form,
      disabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-valuetext': ariaValueText,
      onFocus,
      onBlur,
      onKeyDown,
      tabIndex,
      ...rest
    },
    ref,
  ) => {
    const min = toNumber(minProp, 0)
    const max = toNumber(maxProp, 100)
    const step = toNumber(stepProp, 1)
    useRegisterFieldControl()
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const mergedRef = useMergedRef(ref, inputRef)

    const controlledValue = value === undefined ? undefined : toNumber(value, min)
    const initialValue =
      defaultValue === undefined
        ? rangeDefault(min, max, step)
        : toNumber(defaultValue, rangeDefault(min, max, step))

    const handleValueChange = (next: number, details: BaseSlider.Root.ChangeEventDetails) => {
      const input = inputRef.current
      if (!onChange || !input) return
      input.value = String(next)
      onChange(createChangeEvent(input, details.event))
    }

    return (
      <BaseSlider.Root<number>
        className={clsx(styles.root, className)}
        data-size={size}
        min={min}
        max={max}
        step={step}
        name={name}
        form={form}
        disabled={disabled}
        value={controlledValue}
        defaultValue={controlledValue === undefined ? initialValue : undefined}
        onValueChange={handleValueChange}
        {...(rest as BaseSlider.Root.Props<number>)}
      >
        <BaseSlider.Control className={styles.control}>
          <BaseSlider.Track className={styles.track}>
            <BaseSlider.Thumb
              className={styles.thumb}
              inputRef={mergedRef}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaDescribedBy}
              aria-valuetext={ariaValueText}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              tabIndex={tabIndex}
            />
          </BaseSlider.Track>
        </BaseSlider.Control>
        {showValue && (
          <BaseSlider.Value className={styles.value}>
            {(_formatted, values) => values[0]}
          </BaseSlider.Value>
        )}
      </BaseSlider.Root>
    )
  },
)

Slider.displayName = 'Slider'
