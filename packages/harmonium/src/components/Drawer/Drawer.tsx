import * as React from 'react'
import {Dialog as BaseDialog} from '@base-ui/react/dialog'
import {clsx} from 'clsx'
import {DialogLabelContext, useCloseHandler} from '../Dialog/Dialog'
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

/**
 * A modal panel that slides in from the left or right edge. It behaves like
 * `Dialog` (portal, focus trap, scroll lock, `onClose` on Escape or a backdrop
 * click) and can hold `DialogHeader`, `DialogBody` and `DialogFooter`.
 *
 * @category Overlays
 * @example
 * <Drawer open={open} onClose={() => setOpen(false)} side="right" size="sm">
 *   <DialogHeader>Filters</DialogHeader>
 *   <DialogBody>…</DialogBody>
 * </Drawer>
 */
export const Drawer =React.forwardRef<HTMLDivElement, DrawerProps>(
  ({open, onClose, side = 'right', size = 'md', className, children, ...props}, ref) => {
    const handleOpenChange = useCloseHandler(onClose)

    return (
      <BaseDialog.Root open={Boolean(open)} onOpenChange={handleOpenChange}>
        <BaseDialog.Portal>
          <BaseDialog.Viewport className={styles.overlay}>
            <BaseDialog.Popup
              ref={ref}
              className={clsx(styles.root, className)}
              data-side={side}
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

Drawer.displayName = 'Drawer'
