import * as React from 'react'
import {clsx} from 'clsx'
import styles from './AppShell.module.css'

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the sidebar is collapsed */
  sidebarCollapsed?: boolean
}

export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({sidebarCollapsed, className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-sidebar-collapsed={sidebarCollapsed || undefined}
        {...props}
      >
        {children}
      </div>
    )
  },
)

AppShell.displayName = 'AppShell'

export type AppShellHeaderProps = React.HTMLAttributes<HTMLElement>

export const AppShellHeader = React.forwardRef<
  HTMLElement,
  AppShellHeaderProps
>(({className, children, ...props}, ref) => (
  <header
    ref={ref}
    className={clsx(styles.header, className)}
    {...props}
  >
    {children}
  </header>
))

AppShellHeader.displayName = 'AppShellHeader'

export type AppShellSidebarProps = React.HTMLAttributes<HTMLElement>

export const AppShellSidebar = React.forwardRef<
  HTMLElement,
  AppShellSidebarProps
>(({className, children, ...props}, ref) => (
  <aside
    ref={ref}
    className={clsx(styles.sidebar, className)}
    {...props}
  >
    {children}
  </aside>
))

AppShellSidebar.displayName = 'AppShellSidebar'

export type AppShellMainProps = React.HTMLAttributes<HTMLElement>

export const AppShellMain = React.forwardRef<HTMLElement, AppShellMainProps>(
  ({className, children, ...props}, ref) => (
    <main
      ref={ref}
      className={clsx(styles.main, className)}
      {...props}
    >
      {children}
    </main>
  ),
)

AppShellMain.displayName = 'AppShellMain'

export type AppShellFooterProps = React.HTMLAttributes<HTMLElement>

export const AppShellFooter = React.forwardRef<
  HTMLElement,
  AppShellFooterProps
>(({className, children, ...props}, ref) => (
  <footer
    ref={ref}
    className={clsx(styles.footer, className)}
    {...props}
  >
    {children}
  </footer>
))

AppShellFooter.displayName = 'AppShellFooter'
