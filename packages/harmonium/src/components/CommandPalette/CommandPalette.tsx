import * as React from 'react'
import {Dialog as BaseDialog} from '@base-ui/react/dialog'
import {clsx} from 'clsx'
import {useCloseHandler} from '../Dialog/Dialog'
import styles from './CommandPalette.module.css'

/** A command in a `CommandPalette`. */
export interface CommandItem {
  /** Unique id */
  id: string
  /** Text shown and matched by the search */
  label: string
  /** Heading to group the command under; groups appear in order of first use */
  group?: string
  /** Runs when the command is chosen; the palette then calls `onClose` */
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

/**
 * A modal, searchable command list (the "Command-K" pattern). Typing filters
 * `items` by label, arrow keys move, Enter runs the highlighted command and
 * closes. Opening it is up to you (for example on Cmd/Ctrl+K); it calls
 * `onClose` on Escape, an outside click or after a command runs.
 *
 * @category Overlays
 * @example
 * <CommandPalette
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   items={[
 *     {id: 'new', label: 'New project', group: 'Projects', onSelect: createProject},
 *     {id: 'settings', label: 'Open settings', group: 'Navigation', onSelect: () => navigate('/settings')},
 *   ]}
 * />
 */
export const CommandPalette =React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  ({open, onClose, items, placeholder = 'Type a command...', className, ...props}, ref) => {
    const [query, setQuery] = React.useState('')
    const [highlightIndex, setHighlightIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listRef = React.useRef<HTMLDivElement>(null)
    const id = React.useId()
    const listId = `${id}-list`
    const optionId = (index: number) => `${id}-option-${index}`

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

    const activeId = ordered[highlightIndex] ? optionId(highlightIndex) : undefined

    // Keep the highlighted option visible while arrowing through a long list
    React.useEffect(() => {
      if (!open || !activeId) return
      const option = listRef.current?.ownerDocument.getElementById(activeId)
      option?.scrollIntoView?.({block: 'nearest'})
    }, [open, activeId])

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
              {/* Combobox pattern: focus stays in the input and the
                  highlighted option is exposed via aria-activedescendant */}
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeId}
                aria-label={placeholder}
                className={styles.input}
                value={query}
                placeholder={placeholder}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setHighlightIndex(0)
                }}
                onKeyDown={handleKeyDown}
              />
              <div
                ref={listRef}
                id={listId}
                className={styles.list}
                role="listbox"
                aria-label="Commands"
              >
                {Array.from(grouped.entries()).map(([group, groupedItems], groupIndex) => (
                  <div
                    key={group}
                    role={group ? 'group' : undefined}
                    aria-labelledby={group ? `${id}-group-${groupIndex}` : undefined}
                  >
                    {group && (
                      <div id={`${id}-group-${groupIndex}`} className={styles.groupLabel}>
                        {group}
                      </div>
                    )}
                    {groupedItems.map(({item, flatIndex}) => (
                      <div
                        key={item.id}
                        id={optionId(flatIndex)}
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
              {/* Outside the listbox (which may only hold options) and
                  announced politely when a query matches nothing */}
              <div role="status">
                {filtered.length === 0 && <div className={styles.empty}>No results</div>}
              </div>
            </BaseDialog.Popup>
          </BaseDialog.Viewport>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    )
  },
)

CommandPalette.displayName = 'CommandPalette'
