import * as React from 'react'
import {clsx} from 'clsx'
import styles from './MultiSelect.module.css'

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Available options */
  options: MultiSelectOption[]
  /** Currently selected values */
  value?: string[]
  /** Callback when selection changes */
  onChange?: (value: string[]) => void
  /** Placeholder text */
  placeholder?: string
  /** Whether the component is disabled */
  disabled?: boolean
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({options, value = [], onChange, placeholder = 'Select...', disabled, className, ...props}, ref) => {
    const [query, setQuery] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const filtered = options.filter(
      (opt) =>
        !value.includes(opt.value) &&
        (!query || opt.label.toLowerCase().includes(query.toLowerCase())),
    )

    const remove = (val: string) => {
      onChange?.(value.filter((v) => v !== val))
    }

    const add = (val: string) => {
      onChange?.([...value, val])
      setQuery('')
      inputRef.current?.focus()
    }

    const selectedLabels = value.map(
      (v) => options.find((o) => o.value === v)?.label ?? v,
    )

    return (
      <div ref={ref} className={clsx(styles.root, className)} data-disabled={disabled || undefined} {...props}>
        <div className={styles.control} onClick={() => !disabled && inputRef.current?.focus()}>
          {selectedLabels.map((label, index) => (
            <span key={value[index]} className={styles.tag}>
              {label}
              <button
                type="button"
                className={styles.tagRemove}
                onClick={(event) => {
                  event.stopPropagation()
                  remove(value[index])
                }}
                aria-label={`Remove ${label}`}
                tabIndex={-1}
              >
                &times;
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={query}
            placeholder={value.length === 0 ? placeholder : ''}
            disabled={disabled}
            onChange={(event) => {
              setQuery(event.target.value)
              if (!open) setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onKeyDown={(event) => {
              if (event.key === 'Backspace' && !query && value.length > 0) {
                remove(value[value.length - 1])
              }
              if (event.key === 'Escape') {
                setOpen(false)
              }
            }}
          />
        </div>
        {open && filtered.length > 0 && (
          <ul className={styles.list} role="listbox">
            {filtered.map((opt) => (
              <li
                key={opt.value}
                className={styles.option}
                role="option"
                aria-selected={false}
                onMouseDown={(event) => {
                  event.preventDefault()
                  add(opt.value)
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  },
)

MultiSelect.displayName = 'MultiSelect'
