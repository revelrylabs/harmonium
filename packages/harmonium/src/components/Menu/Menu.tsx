import * as React from 'react'
import {Menu as BaseMenu} from '@base-ui/react/menu'
import {mergeProps} from '@base-ui/react/merge-props'
import {clsx} from 'clsx'
import styles from './Menu.module.css'

/** Whether items render inside a Base UI dropdown (`trigger` set) or an inline menu. */
const DropdownContext = React.createContext(false)

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Element that opens the menu as a dropdown (e.g. `<Button>Actions</Button>`).
   * Without it, the menu renders inline.
   */
  trigger?: React.ReactElement
  /** Side of the trigger to show the dropdown */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /** Whether the dropdown is open (controlled) */
  open?: boolean
  /** Callback when the dropdown's open state changes */
  onOpenChange?: (open: boolean) => void
}

const ITEM_SELECTOR = '[role="menuitem"]'

/** Enabled items that belong to this menu (not to a nested one). */
function getItems(menu: HTMLElement): HTMLElement[] {
  return Array.from(menu.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter(
    (item) =>
      item.closest('[role="menu"]') === menu &&
      !item.matches(':disabled, [aria-disabled="true"]'),
  )
}

/**
 * Inline menu: one tab stop (roving tabindex), arrow keys, Home/End and
 * typeahead, following the WAI-ARIA menu pattern.
 */
const InlineMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, children, ...props}, ref) => {
    const menuRef = React.useRef<HTMLDivElement>(null)
    const activeRef = React.useRef<HTMLElement | null>(null)

    React.useImperativeHandle(ref, () => menuRef.current as HTMLDivElement)

    const setActive = React.useCallback((target?: HTMLElement) => {
      const menu = menuRef.current
      if (!menu) return
      const items = getItems(menu)
      const active =
        (target && items.includes(target) && target) ||
        (activeRef.current && items.includes(activeRef.current) && activeRef.current) ||
        items[0]
      activeRef.current = active ?? null
      for (const item of menu.querySelectorAll<HTMLElement>(ITEM_SELECTOR)) {
        if (item.closest('[role="menu"]') === menu) item.tabIndex = item === active ? 0 : -1
      }
    }, [])

    // Re-sync after every render: items may have been added, removed or disabled.
    React.useLayoutEffect(() => setActive())

    const move = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const menu = menuRef.current
      if (!menu) return
      const items = getItems(menu)
      if (items.length === 0) return
      const index = items.indexOf(document.activeElement as HTMLElement)
      let next: HTMLElement | undefined
      switch (event.key) {
        case 'ArrowDown':
          next = items[(index + 1) % items.length]
          break
        case 'ArrowUp':
          next = items[(index - 1 + items.length) % items.length]
          break
        case 'Home':
          next = items[0]
          break
        case 'End':
          next = items[items.length - 1]
          break
        default:
          if (event.key.length === 1 && /\S/.test(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {
            const char = event.key.toLowerCase()
            const ordered = [...items.slice(index + 1), ...items.slice(0, index + 1)]
            next = ordered.find((item) =>
              item.textContent?.trim().toLowerCase().startsWith(char),
            )
          }
      }
      if (!next) return
      event.preventDefault()
      setActive(next)
      next.focus()
    }

    return (
      <div
        ref={menuRef}
        {...mergeProps<'div'>(
          {
            className: clsx(styles.root, className),
            role: 'menu',
            onKeyDown: move,
            onFocus: (event) => setActive(event.target as HTMLElement),
          },
          props,
        )}
      >
        {children}
      </div>
    )
  },
)
InlineMenu.displayName = 'InlineMenu'

/**
 * A list of actions. With `trigger` it's a dropdown that opens from that
 * element; without it, it renders inline. Either way it has one tab stop,
 * arrow keys, Home/End and typeahead, and skips disabled items.
 *
 * @category Overlays
 * @example
 * <Menu trigger={<Button variant="outline">Actions</Button>}>
 *   <MenuLabel>Project</MenuLabel>
 *   <MenuItem onClick={rename}>Rename</MenuItem>
 *   <MenuItem onClick={duplicate}>Duplicate</MenuItem>
 *   <MenuSeparator />
 *   <MenuItem variant="danger" onClick={remove}>Delete</MenuItem>
 * </Menu>
 */
export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({trigger, side = 'bottom', open, onOpenChange, className, children, ...props}, ref) => {
    if (!trigger) {
      return (
        <InlineMenu ref={ref} className={className} {...props}>
          {children}
        </InlineMenu>
      )
    }

    // Custom components (Button, IconButton) are assumed to render <button>.
    const nativeButton = typeof trigger.type === 'string' ? trigger.type === 'button' : true

    return (
      <BaseMenu.Root
        open={open}
        onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
      >
        <BaseMenu.Trigger render={trigger} nativeButton={nativeButton} />
        <BaseMenu.Portal>
          <BaseMenu.Positioner className={styles.positioner} side={side}>
            <BaseMenu.Popup ref={ref} className={clsx(styles.root, className)} {...props}>
              <DropdownContext.Provider value={true}>{children}</DropdownContext.Provider>
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </BaseMenu.Root>
    )
  },
)

Menu.displayName = 'Menu'

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether the item is destructive/dangerous */
  variant?: 'default' | 'danger'
}

/** An action in a `Menu`: a `<button role="menuitem">`. In a dropdown, choosing it closes the menu. */
export const MenuItem =React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({variant = 'default', className, disabled, children, ...props}, ref) => {
    const inDropdown = React.useContext(DropdownContext)

    if (inDropdown) {
      // Base UI merges its props (role, tabIndex, handlers) with the button's.
      return (
        <BaseMenu.Item
          ref={ref}
          disabled={disabled}
          nativeButton
          render={<button type="button" data-variant={variant} {...props} />}
          className={clsx(styles.item, className)}
        >
          {children}
        </BaseMenu.Item>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(styles.item, className)}
        role="menuitem"
        data-variant={variant}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  },
)

MenuItem.displayName = 'MenuItem'

export type MenuSeparatorProps = React.HTMLAttributes<HTMLDivElement>

/** A divider between groups of `MenuItem`s. */
export const MenuSeparator =React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({className, ...props}, ref) => (
    <div
      ref={ref}
      className={clsx(styles.separator, className)}
      role="separator"
      {...props}
    />
  ),
)

MenuSeparator.displayName = 'MenuSeparator'

export type MenuLabelProps = React.HTMLAttributes<HTMLDivElement>

/** A non-interactive heading for a group of `MenuItem`s. */
export const MenuLabel =React.forwardRef<HTMLDivElement, MenuLabelProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.label, className)} {...props}>
      {children}
    </div>
  ),
)

MenuLabel.displayName = 'MenuLabel'
