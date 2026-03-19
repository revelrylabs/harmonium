import * as React from 'react'
import {clsx} from 'clsx'
import styles from './CommandPalette.module.css'

export interface CommandItem {
  id: string
  label: string
  group?: string
  onSelect: () => void
}

export interface CommandPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the palette is open */
  open?: boolean
  /** Callback when the palette should close */
  onClose?: () => void
  /** Available commands */
  items: CommandItem[]
  /** Placeholder text */
  placeholder?: string
}

interface GroupedItem {
  item: CommandItem
  flatIndex: number
  group: string
}

function buildGroupedItems(filtered: CommandItem[]): Map<string, GroupedItem[]> {
  const groups = new Map<string, GroupedItem[]>()
  let flatIndex = 0
  for (const item of filtered) {
    const group = item.group ?? ''
    if (!groups.has(group)) groups.set(group, [])
    groups.get(group)?.push({item, flatIndex, group})
    flatIndex++
  }
  return groups
}

export const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  ({open, onClose, items, placeholder = 'Type a command...', className, ...props}, ref) => {
    const [query, setQuery] = React.useState('')
    const [highlightIndex, setHighlightIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const filtered = query
      ? items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
      : items

    const grouped = React.useMemo(() => buildGroupedItems(filtered), [filtered])

    React.useEffect(() => {
      if (open) {
        setQuery('')
        setHighlightIndex(0)
        setTimeout(() => inputRef.current?.focus(), 0)
      }
    }, [open])

    React.useEffect(() => {
      if (!open) return
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose?.()
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, onClose])

    const select = (item: CommandItem) => {
      item.onSelect()
      onClose?.()
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
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
          if (filtered[highlightIndex]) select(filtered[highlightIndex])
          break
      }
    }

    if (!open) return null

    return (
      <div className={styles.overlay} onClick={onClose}>
        <div
          ref={ref}
          className={clsx(styles.root, className)}
          onClick={(event) => event.stopPropagation()}
          {...props}
        >
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={query}
            placeholder={placeholder}
            onChange={(event) => {
              setQuery(event.target.value)
              setHighlightIndex(0)
            }}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.list} role="listbox">
            {filtered.length === 0 && (
              <div className={styles.empty}>No results</div>
            )}
            {Array.from(grouped.entries()).map(([group, groupedItems]) => (
              <div key={group}>
                {group && <div className={styles.groupLabel}>{group}</div>}
                {groupedItems.map(({item, flatIndex}) => (
                  <div
                    key={item.id}
                    className={styles.item}
                    role="option"
                    aria-selected={flatIndex === highlightIndex}
                    data-highlighted={flatIndex === highlightIndex || undefined}
                    onClick={() => select(item)}
                    onMouseEnter={() => setHighlightIndex(flatIndex)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
)

CommandPalette.displayName = 'CommandPalette'
