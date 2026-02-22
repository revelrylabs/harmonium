import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Combobox.module.css'

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Available options */
  options: ComboboxOption[]
  /** Current value */
  value?: string
  /** Callback when value changes */
  onChange?: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Whether the combobox is disabled */
  disabled?: boolean
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  ({options, value, onChange, placeholder = 'Search...', disabled, className, ...props}, ref) => {
    const instanceId = React.useId()
    const [query, setQuery] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [highlightIndex, setHighlightIndex] = React.useState(-1)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const filtered = query
      ? options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase()))
      : options

    const selectedLabel = options.find((opt) => opt.value === value)?.label ?? ''

    React.useEffect(() => {
      if (!open) {
        setQuery('')
        setHighlightIndex(-1)
      }
    }, [open])

    const select = (val: string) => {
      onChange?.(val)
      setOpen(false)
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (!open && (event.key === 'ArrowDown' || event.key === 'Enter')) {
        setOpen(true)
        event.preventDefault()
        return
      }
      if (!open) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setHighlightIndex((prev) => Math.min(prev + 1, filtered.length - 1))
          break
        case 'ArrowUp':
          event.preventDefault()
          setHighlightIndex((prev) => Math.max(prev - 1, 0))
          break
        case 'Enter':
          event.preventDefault()
          if (highlightIndex >= 0 && filtered[highlightIndex]) {
            select(filtered[highlightIndex].value)
          }
          break
        case 'Escape':
          event.preventDefault()
          setOpen(false)
          break
      }
    }

    const optionId = (index: number) => `${instanceId}-option-${index}`

    return (
      <div ref={ref} className={clsx(styles.root, className)} {...props}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          value={open ? query : selectedLabel}
          placeholder={placeholder}
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-activedescendant={
            highlightIndex >= 0 ? optionId(highlightIndex) : undefined
          }
          onChange={(event) => {
            setQuery(event.target.value)
            if (!open) setOpen(true)
            setHighlightIndex(-1)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          onKeyDown={handleKeyDown}
        />
        {open && filtered.length > 0 && (
          <ul className={styles.list} role="listbox">
            {filtered.map((opt, index) => (
              <li
                key={opt.value}
                id={optionId(index)}
                className={styles.option}
                role="option"
                aria-selected={opt.value === value}
                data-highlighted={index === highlightIndex || undefined}
                onMouseDown={(event) => {
                  event.preventDefault()
                  select(opt.value)
                }}
                onMouseEnter={() => setHighlightIndex(index)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
        {open && filtered.length === 0 && query && (
          <div className={styles.empty}>No results</div>
        )}
      </div>
    )
  },
)

Combobox.displayName = 'Combobox'
