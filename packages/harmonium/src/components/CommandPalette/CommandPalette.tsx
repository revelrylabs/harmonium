import * as React from 'react'
import {Dialog as BaseDialog} from '@base-ui/react/dialog'
import {clsx} from 'clsx'
import {useCloseHandler} from '../Dialog/Dialog'
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

/**
 * Group items by first appearance of their group, and number them in the
 * order they render so keyboard navigation follows what's on screen.
 */
function buildGroupedItems(filtered: CommandItem[]): {
  groups: Map<string, GroupedItem[]>
  ordered: CommandItem[]
} {
  const groups = new Map<string, GroupedItem[]>()
  for (const item of filtered) {
    const group = item.group ?? ''
    if (!groups.has(group)) groups.set(group, [])
    groups.get(group)?.push({item, flatIndex: 0, group})
  }
  const ordered: CommandItem[] = []
  for (const groupedItems of groups.values()) {
    for (const entry of groupedItems) {
      entry.flatIndex = ordered.push(entry.item) - 1
    }
  }
  return {groups, ordered}
}

export const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  ({open, onClose, items, placeholder = 'Type a command...', className, ...props}, ref) => {
    const [query, setQuery] = React.useState('')
    const [highlightIndex, setHighlightIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const filtered = React.useMemo(
      () =>
        query
          ? items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
          : items,
      [items, query],
    )

    const {groups: grouped, ordered} = React.useMemo(
      () => buildGroupedItems(filtered),
      [filtered],
    )

    // Base UI Dialog handles Escape, outside clicks, the focus trap, focus
    // return and scroll lock; the palette only resets its own state.
    const handleOpenChange = useCloseHandler(onClose)

    React.useEffect(() => {
      if (open) {
        setQuery('')
        setHighlightIndex(0)
      }
    }, [open])

    const select = (item: CommandItem) => {
      item.onSelect()
      onClose?.()
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setHighlightIndex((prev) => Math.min(prev + 1, ordered.length - 1))
          break
        case 'ArrowUp':
          event.preventDefault()
          setHighlightIndex((prev) => Math.max(prev - 1, 0))
          break
        case 'Enter':
          event.preventDefault()
          if (ordered[highlightIndex]) select(ordered[highlightIndex])
          break
      }
    }

    return (
      <BaseDialog.Root open={Boolean(open)} onOpenChange={handleOpenChange}>
        <BaseDialog.Portal>
          <BaseDialog.Viewport className={styles.overlay}>
            <BaseDialog.Popup
              ref={ref}
              className={clsx(styles.root, className)}
              aria-modal="true"
              aria-label="Command palette"
              initialFocus={inputRef}
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
              <div className={styles.list} role="listbox" aria-label="Commands">
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
            </BaseDialog.Popup>
          </BaseDialog.Viewport>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    )
  },
)

CommandPalette.displayName = 'CommandPalette'
