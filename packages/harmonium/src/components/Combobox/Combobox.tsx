import * as React from 'react'
import {Combobox as BaseCombobox} from '@base-ui/react/combobox'
import {mergeProps} from '@base-ui/react/merge-props'
import {clsx} from 'clsx'
import {useFieldContext} from '../Field'
import styles from './Combobox.module.css'

/** An option of a `Combobox`. */
export interface ComboboxOption {
  /** Value passed to `onChange` when this option is chosen */
  value: string
  /** Text shown in the list and in the input, and matched by search */
  label: string
}

export interface ComboboxProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue'
  > {
  /** Available options */
  options: ComboboxOption[]
  /** Current value (controlled). Use `''` for no selection. */
  value?: string
  /** Initial value when uncontrolled */
  defaultValue?: string
  /** Callback when value changes. Receives `''` when the input is cleared. */
  onChange?: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Whether the combobox is disabled */
  disabled?: boolean
}

const toBaseValue = (value: string | undefined) =>
  value === undefined ? undefined : value === '' ? null : value

/**
 * A searchable single-select: typing filters `options`, arrow keys move
 * through them and Enter picks one. Follows the ARIA combobox pattern.
 * Controlled with `value` + `onChange`, or uncontrolled with `defaultValue`.
 * Wired to the surrounding `Field`.
 *
 * @category Forms
 * @example
 * <Field>
 *   <FieldLabel>Country</FieldLabel>
 *   <Combobox
 *     options={[{value: 'us', label: 'United States'}, {value: 'ca', label: 'Canada'}]}
 *     value={country}
 *     onChange={setCountry}
 *     placeholder="Search countries"
 *   />
 * </Field>
 */
export const Combobox =React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = 'Search...',
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const ctx = useFieldContext()
    const rootRef = React.useRef<HTMLDivElement | null>(null)
    const setRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref],
    )

    const items = React.useMemo(() => options.map((opt) => opt.value), [options])
    const labels = React.useMemo(
      () => new Map(options.map((opt) => [opt.value, opt.label])),
      [options],
    )
    const itemToStringLabel = React.useCallback(
      (val: string) => labels.get(val) ?? val,
      [labels],
    )

    return (
      <div
        {...mergeProps<'div'>({className: clsx(styles.root, className)}, props)}
        ref={setRootRef}
      >
        <BaseCombobox.Root<string>
          items={items}
          value={toBaseValue(value)}
          defaultValue={toBaseValue(defaultValue)}
          onValueChange={(next) => onChange?.(next ?? '')}
          itemToStringLabel={itemToStringLabel}
          disabled={disabled}
        >
          <BaseCombobox.Input
            className={styles.input}
            placeholder={placeholder}
            id={ctx?.fieldId}
            aria-describedby={ctx?.describedBy}
            aria-errormessage={ctx?.error ? ctx.errorId : undefined}
            aria-invalid={ctx?.error || undefined}
          />
          <BaseCombobox.Portal container={rootRef}>
            <BaseCombobox.Positioner className={styles.positioner}>
              <BaseCombobox.Popup className={styles.popup}>
                <BaseCombobox.Empty className={styles.empty}>
                  No results
                </BaseCombobox.Empty>
                <BaseCombobox.List className={styles.list} render={<ul />}>
                  {(item: string) => (
                    <BaseCombobox.Item
                      key={item}
                      value={item}
                      className={styles.option}
                      render={<li />}
                    >
                      {itemToStringLabel(item)}
                    </BaseCombobox.Item>
                  )}
                </BaseCombobox.List>
              </BaseCombobox.Popup>
            </BaseCombobox.Positioner>
          </BaseCombobox.Portal>
        </BaseCombobox.Root>
      </div>
    )
  },
)

Combobox.displayName = 'Combobox'
