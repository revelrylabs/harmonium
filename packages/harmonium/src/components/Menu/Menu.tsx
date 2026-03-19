import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Menu.module.css'

export type MenuProps = React.HTMLAttributes<HTMLDivElement>

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.root, className)} role="menu" {...props}>
      {children}
    </div>
  ),
)

Menu.displayName = 'Menu'

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether the item is destructive/dangerous */
  variant?: 'default' | 'danger'
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({variant = 'default', className, children, ...props}, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx(styles.item, className)}
      role="menuitem"
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  ),
)

MenuItem.displayName = 'MenuItem'

export type MenuSeparatorProps = React.HTMLAttributes<HTMLDivElement>

export const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
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

export const MenuLabel = React.forwardRef<HTMLDivElement, MenuLabelProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.label, className)} {...props}>
      {children}
    </div>
  ),
)

MenuLabel.displayName = 'MenuLabel'
