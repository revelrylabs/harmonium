import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Accordion.module.css'

interface AccordionContextValue {
  openItems: Set<string>
  toggle: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordionContext() {
  const ctx = React.useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion components must be used within <Accordion>')
  return ctx
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Allow multiple items to be open simultaneously */
  multiple?: boolean
  /** Currently open item(s) (controlled) */
  value?: string | string[]
  /** Default open item(s) (uncontrolled) */
  defaultValue?: string | string[]
  /** Callback when open items change */
  onValueChange?: (value: string[]) => void
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({multiple, value, defaultValue, onValueChange, className, children, ...props}, ref) => {
    const toSet = (val?: string | string[]) => {
      if (!val) return new Set<string>()
      return new Set(Array.isArray(val) ? val : [val])
    }

    const [internal, setInternal] = React.useState(() => toSet(defaultValue))
    const openItems = value !== undefined ? toSet(value) : internal

    const toggle = React.useCallback(
      (item: string) => {
        const compute = (current: Set<string>) => {
          const next = new Set(current)
          if (next.has(item)) {
            next.delete(item)
          } else {
            if (!multiple) next.clear()
            next.add(item)
          }
          return next
        }

        if (value === undefined) {
          setInternal((prev) => {
            const next = compute(prev)
            onValueChange?.(Array.from(next))
            return next
          })
        } else {
          const next = compute(toSet(value))
          onValueChange?.(Array.from(next))
        }
      },
      [multiple, value, onValueChange],
    )

    return (
      <AccordionContext.Provider value={{openItems, toggle}}>
        <div ref={ref} className={clsx(styles.root, className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)

Accordion.displayName = 'Accordion'

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique item value */
  value: string
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({value, className, children, ...props}, ref) => {
    const {openItems} = useAccordionContext()
    const isOpen = openItems.has(value)

    return (
      <div
        ref={ref}
        className={clsx(styles.item, className)}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </div>
    )
  },
)

AccordionItem.displayName = 'AccordionItem'

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Item value this trigger controls */
  value: string
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({value, className, children, ...props}, ref) => {
    const {openItems, toggle} = useAccordionContext()
    const isOpen = openItems.has(value)

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(styles.trigger, className)}
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={() => toggle(value)}
        {...props}
      >
        {children}
        <span className={styles.chevron} data-state={isOpen ? 'open' : 'closed'} aria-hidden="true">&#x25B8;</span>
      </button>
    )
  },
)

AccordionTrigger.displayName = 'AccordionTrigger'

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Item value this content belongs to */
  value: string
}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({value, className, children, ...props}, ref) => {
    const {openItems} = useAccordionContext()
    const isOpen = openItems.has(value)

    if (!isOpen) return null

    return (
      <div
        ref={ref}
        className={clsx(styles.content, className)}
        role="region"
        {...props}
      >
        {children}
      </div>
    )
  },
)

AccordionContent.displayName = 'AccordionContent'
