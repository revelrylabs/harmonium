import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Tabs.module.css'

interface TabsContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('Tabs components must be used within <Tabs>')
  return ctx
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Currently active tab ID (controlled) */
  value?: string
  /** Default active tab ID (uncontrolled) */
  defaultValue?: string
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({value, defaultValue, onValueChange, className, children, ...props}, ref) => {
    const [internal, setInternal] = React.useState(defaultValue ?? '')
    const activeTab = value ?? internal

    const setActiveTab = React.useCallback(
      (id: string) => {
        if (value === undefined) setInternal(id)
        onValueChange?.(id)
      },
      [value, onValueChange],
    )

    return (
      <TabsContext.Provider value={{activeTab, setActiveTab}}>
        <div ref={ref} className={clsx(styles.root, className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  },
)

Tabs.displayName = 'Tabs'

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({className, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.list, className)} role="tablist" {...props} />
  ),
)
TabsList.displayName = 'TabsList'

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Tab ID this trigger controls */
  value: string
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({value, className, children, ...props}, ref) => {
    const {activeTab, setActiveTab} = useTabsContext()
    const isActive = activeTab === value

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        className={clsx(styles.trigger, className)}
        aria-selected={isActive}
        data-state={isActive ? 'active' : 'inactive'}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {children}
      </button>
    )
  },
)

TabsTrigger.displayName = 'TabsTrigger'

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tab ID this content belongs to */
  value: string
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({value, className, children, ...props}, ref) => {
    const {activeTab} = useTabsContext()
    if (activeTab !== value) return null

    return (
      <div
        ref={ref}
        className={clsx(styles.content, className)}
        role="tabpanel"
        {...props}
      >
        {children}
      </div>
    )
  },
)

TabsContent.displayName = 'TabsContent'
