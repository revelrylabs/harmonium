import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Dialog.module.css'

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the dialog is open */
  open?: boolean
  /** Callback when the dialog should close */
  onClose?: () => void
  /** Size of the dialog */
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({open, onClose, size = 'md', className, children, ...props}, ref) => {
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

Dialog.displayName = 'Dialog'

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.header, className)} {...props}>
      {children}
    </div>
  ),
)
DialogHeader.displayName = 'DialogHeader'

export type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>

export const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.body, className)} {...props}>
      {children}
    </div>
  ),
)
DialogBody.displayName = 'DialogBody'

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.footer, className)} {...props}>
      {children}
    </div>
  ),
)
DialogFooter.displayName = 'DialogFooter'
