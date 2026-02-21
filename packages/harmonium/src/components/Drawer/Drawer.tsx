import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Drawer.module.css'

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the drawer is open */
  open?: boolean
  /** Callback when the drawer should close */
  onClose?: () => void
  /** Side the drawer slides in from */
  side?: 'left' | 'right'
  /** Width of the drawer */
  size?: 'sm' | 'md' | 'lg'
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({open, onClose, side = 'right', size = 'md', className, children, ...props}, ref) => {
    React.useEffect(() => {
      if (!open) return
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose?.()
      }
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    }, [open, onClose])

    if (!open) return null

    return (
      <div className={styles.overlay} onClick={onClose}>
        <div
          ref={ref}
          className={clsx(styles.root, className)}
          data-side={side}
          data-size={size}
          role="dialog"
          aria-modal="true"
          onClick={(event) => event.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  },
)

Drawer.displayName = 'Drawer'
