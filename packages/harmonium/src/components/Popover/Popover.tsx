import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Popover.module.css'

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Popover content */
  content: React.ReactNode
  /** Side of the trigger to show the popover */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /** Whether the popover is open (controlled) */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({content, side = 'bottom', open: controlledOpen, onOpenChange, className, children, ...props}, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const isOpen = controlledOpen ?? internalOpen

    const toggle = React.useCallback(() => {
      const next = !isOpen
      if (controlledOpen === undefined) setInternalOpen(next)
      onOpenChange?.(next)
    }, [isOpen, controlledOpen, onOpenChange])

    const close = React.useCallback(() => {
      if (controlledOpen === undefined) setInternalOpen(false)
      onOpenChange?.(false)
    }, [controlledOpen, onOpenChange])

    React.useEffect(() => {
      if (!isOpen) return
      const handleClick = (event: MouseEvent) => {
        const target = event.target as Node
        if (rootRef.current && !rootRef.current.contains(target)) {
          close()
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [isOpen, close])

    const rootRef = React.useRef<HTMLDivElement>(null)

    return (
      <div
        ref={(node) => {
          (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className={clsx(styles.root, className)}
        {...props}
      >
        <div onClick={toggle} className={styles.trigger}>{children}</div>
        {isOpen && (
          <div className={styles.content} data-side={side}>
            {content}
          </div>
        )}
      </div>
    )
  },
)

Popover.displayName = 'Popover'
