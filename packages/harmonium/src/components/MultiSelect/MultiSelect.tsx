import * as React from 'react'
import {Combobox as BaseCombobox} from '@base-ui/react/combobox'
import {mergeProps} from '@base-ui/react/merge-props'
import {clsx} from 'clsx'
import {useFieldContext} from '../Field'
import styles from './MultiSelect.module.css'

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue'
  > {
  /** Available options */
  options: MultiSelectOption[]
  /** Currently selected values (controlled) */
  value?: string[]
  /** Initially selected values when uncontrolled */
  defaultValue?: string[]
  /** Callback when selection changes */
  onChange?: (value: string[]) => void
  /** Placeholder text */
  placeholder?: string
  /** Whether the component is disabled */
  disabled?: boolean
}

const EMPTY: string[] = []

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue,
      onChange,
      placeholder = 'Select...',
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const ctx = useFieldContext()
    const rootRef = React.useRef<HTMLDivElement | null>(null)
    const controlRef = React.useRef<HTMLDivElement | null>(null)
    const setRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref],
    )

    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      string[]
    >(defaultValue ?? EMPTY)
    const value = valueProp ?? uncontrolledValue
    const [query, setQuery] = React.useState('')

    const labels = React.useMemo(
      () => new Map(options.map((opt) => [opt.value, opt.label])),
      [options],
    )
    const itemToStringLabel = React.useCallback(
      (val: string) => labels.get(val) ?? val,
      [labels],
    )
    // Already-selected options are shown as tags, not in the list
    const items = React.useMemo(
      () =>
        options
          .filter((opt) => !value.includes(opt.value))
          .map((opt) => opt.value),
      [options, value],
    )

    const handleValueChange = (next: string[]) => {
      if (valueProp === undefined) setUncontrolledValue(next)
      if (next.length > value.length) setQuery('')
      onChange?.(next)
    }

    return (
      <div
        {...mergeProps<'div'>(
          {
            className: clsx(styles.root, className),
            'data-disabled': disabled || undefined,
          } as React.ComponentPropsWithRef<'div'>,
          props,
        )}
        ref={setRootRef}
      >
        <BaseCombobox.Root<string, true>
          multiple
          items={items}
          value={value}
          onValueChange={handleValueChange}
          inputValue={query}
          onInputValueChange={setQuery}
          itemToStringLabel={itemToStringLabel}
          disabled={disabled}
        >
          <BaseCombobox.Chips ref={controlRef} className={styles.control}>
            {value.map((val) => {
              const label = itemToStringLabel(val)
              return (
                <BaseCombobox.Chip
                  key={val}
                  className={styles.tag}
                  render={<span />}
                >
                  {label}
                  <BaseCombobox.ChipRemove
                    className={styles.tagRemove}
                    aria-label={`Remove ${label}`}
                  >
                    &times;
                  </BaseCombobox.ChipRemove>
                </BaseCombobox.Chip>
              )
            })}
            <BaseCombobox.Input
              className={styles.input}
              placeholder={value.length === 0 ? placeholder : ''}
              id={ctx?.fieldId}
              aria-describedby={ctx?.describedBy}
              aria-errormessage={ctx?.error ? ctx.errorId : undefined}
              aria-invalid={ctx?.error || undefined}
            />
          </BaseCombobox.Chips>
          <BaseCombobox.Portal container={rootRef}>
            <BaseCombobox.Positioner
              anchor={controlRef}
              className={styles.positioner}
            >
              <BaseCombobox.Popup className={styles.popup}>
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

MultiSelect.displayName = 'MultiSelect'
