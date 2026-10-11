import * as React from 'react'
import {Tabs as BaseTabs} from '@base-ui/react/tabs'
import {clsx} from 'clsx'
import styles from './Tabs.module.css'

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /** Currently active tab ID (controlled) */
  value?: string
  /**
   * Default active tab ID (uncontrolled). When omitted, the first enabled tab
   * is selected.
   */
  defaultValue?: string
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void
}

/**
 * Tabs built on Base UI: arrow keys (and Home/End) move between tabs with a
 * roving tabindex, and each tab is wired to its panel with `aria-controls` /
 * `aria-labelledby`.
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({value, defaultValue, onValueChange, className, ...props}, ref) => (
    <BaseTabs.Root
      ref={ref}
      className={clsx(styles.root, className)}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next, details) => {
        // Base UI also reports its automatic first selection; consumers only
        // hear about real changes, as before.
        if (details.reason === 'initial' || next == null) return
        onValueChange?.(next as string)
      }}
      {...props}
    />
  ),
)

Tabs.displayName = 'Tabs'

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({className, ...props}, ref) => (
    <BaseTabs.List
      ref={ref}
      className={clsx(styles.list, className)}
      {...props}
    />
  ),
)
TabsList.displayName = 'TabsList'

export interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Tab ID this trigger controls */
  value: string
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({value, className, ...props}, ref) => (
    <BaseTabs.Tab
      ref={ref as React.Ref<HTMLElement>}
      value={value}
      className={clsx(styles.trigger, className)}
      // Keep the `data-state` styling hook alongside Base UI's `data-active`.
      render={(renderProps, state) => (
        <button
          {...renderProps}
          data-state={state.active ? 'active' : 'inactive'}
        />
      )}
      {...props}
    />
  ),
)

TabsTrigger.displayName = 'TabsTrigger'

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tab ID this content belongs to */
  value: string
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({value, className, ...props}, ref) => (
    <BaseTabs.Panel
      ref={ref}
      value={value}
      className={clsx(styles.content, className)}
      {...props}
    />
  ),
)

TabsContent.displayName = 'TabsContent'
