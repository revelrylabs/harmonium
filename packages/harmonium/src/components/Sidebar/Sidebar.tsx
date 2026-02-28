import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Sidebar.module.css'

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the sidebar is collapsed to icon-only mode */
  collapsed?: boolean
  /** Width variant */
  width?: 'sm' | 'md' | 'lg'
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({collapsed, width = 'md', className, children, ...props}, ref) => {
    return (
      <nav
        ref={ref}
        className={clsx(styles.root, className)}
        data-collapsed={collapsed || undefined}
        data-width={width}
        {...props}
      >
        {children}
      </nav>
    )
  },
)

Sidebar.displayName = 'Sidebar'

export interface SidebarSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional label for the section */
  label?: string
}

export const SidebarSection = React.forwardRef<
  HTMLDivElement,
  SidebarSectionProps
>(({label, className, children, ...props}, ref) => {
  return (
    <div ref={ref} className={clsx(styles.section, className)} {...props}>
      {label && <div className={styles.sectionLabel}>{label}</div>}
      {children}
    </div>
  )
})

SidebarSection.displayName = 'SidebarSection'

export interface SidebarItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /** Whether this item is currently active */
  active?: boolean
  /** Optional icon element rendered before the label */
  icon?: React.ReactNode
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({active, icon, className, children, ...props}, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(styles.item, className)}
        data-active={active || undefined}
        {...props}
      >
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemLabel}>{children}</span>
      </button>
    )
  },
)

SidebarItem.displayName = 'SidebarItem'
