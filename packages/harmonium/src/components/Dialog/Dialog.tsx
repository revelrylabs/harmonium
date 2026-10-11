import * as React from 'react'
import {Dialog as BaseDialog} from '@base-ui/react/dialog'
import {clsx} from 'clsx'
import styles from './Dialog.module.css'

/**
 * Lets `DialogHeader` label the surrounding dialog. `Drawer` provides it too,
 * since both are built on Base UI Dialog.
 */
export const DialogLabelContext = React.createContext(false)

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the dialog is open */
  open?: boolean
  /** Callback when the dialog should close */
  onClose?: () => void
  /** Size of the dialog */
  size?: 'sm' | 'md' | 'lg' | 'full'
}

/**
 * Keeps the latest `onClose` in a ref so Base UI always calls the current
 * callback without re-subscribing.
 */
export function useCloseHandler(onClose?: () => void) {
  const onCloseRef = React.useRef(onClose)
  React.useLayoutEffect(() => {
    onCloseRef.current = onClose
  })
  return React.useCallback((open: boolean) => {
    if (!open) onCloseRef.current?.()
  }, [])
}

/**
 * A modal dialog, rendered in a portal on `document.body`. While open it
 * traps focus, locks page scroll and returns focus on close. It's controlled:
 * it calls `onClose` on Escape or a backdrop click, and you set `open` to
 * false. A `DialogHeader` inside labels it. It has no built-in close button.
 *
 * @category Overlays
 * @example
 * <Dialog open={open} onClose={() => setOpen(false)} size="sm">
 *   <DialogHeader>Delete project?</DialogHeader>
 *   <DialogBody>This can't be undone.</DialogBody>
 *   <DialogFooter>
 *     <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button onClick={remove}>Delete</Button>
 *   </DialogFooter>
 * </Dialog>
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({open, onClose, size = 'md', className, children, ...props}, ref) => {
    const handleOpenChange = useCloseHandler(onClose)

    return (
      <BaseDialog.Root open={Boolean(open)} onOpenChange={handleOpenChange}>
        <BaseDialog.Portal>
          <BaseDialog.Viewport className={styles.overlay}>
            <BaseDialog.Popup
              ref={ref}
              className={clsx(styles.root, className)}
              data-size={size}
              aria-modal="true"
              {...props}
            >
              <DialogLabelContext.Provider value={true}>
                {children}
              </DialogLabelContext.Provider>
            </BaseDialog.Popup>
          </BaseDialog.Viewport>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    )
  },
)

Dialog.displayName = 'Dialog'

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>

/** The title area of a `Dialog`. Inside a Dialog or Drawer, it also labels the dialog (`aria-labelledby`). */
export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({className, children, ...props}, ref) => {
    const labelsDialog = React.useContext(DialogLabelContext)
    if (labelsDialog) {
      return (
        <BaseDialog.Title
          ref={ref}
          render={<div />}
          className={clsx(styles.header, className)}
          {...props}
        >
          {children}
        </BaseDialog.Title>
      )
    }
    return (
      <div ref={ref} className={clsx(styles.header, className)} {...props}>
        {children}
      </div>
    )
  },
)
DialogHeader.displayName = 'DialogHeader'

export type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>

/** The main content of a `Dialog` or `Drawer`. */
export const DialogBody =React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.body, className)} {...props}>
      {children}
    </div>
  ),
)
DialogBody.displayName = 'DialogBody'

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>

/** The actions row at the bottom of a `Dialog` or `Drawer`. */
export const DialogFooter =React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={clsx(styles.footer, className)} {...props}>
      {children}
    </div>
  ),
)
DialogFooter.displayName = 'DialogFooter'
