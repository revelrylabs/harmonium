import * as React from 'react'
import {Popover as BasePopover} from '@base-ui/react/popover'
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

type TriggerElement = React.ReactElement<{id?: string}>

/**
 * The child element becomes the trigger, so `<Popover><Button/></Popover>` has
 * a single tab stop. Text children get a focusable `<span role="button">`.
 */
function getTrigger(children: React.ReactNode): {
  render: React.ReactElement
  nativeButton: boolean
  childId?: string
} {
  if (React.isValidElement(children)) {
    const child = children as TriggerElement
    return {
      render: child,
      // Custom components (Button, IconButton) are assumed to render <button>.
      nativeButton: typeof child.type === 'string' ? child.type === 'button' : true,
      childId: child.props.id,
    }
  }
  return {render: <span>{children}</span>, nativeButton: false}
}

/**
 * Floating content that opens when its child is clicked. The child (for
 * example a `Button`) becomes the trigger. The popup is portalled, flips when
 * there's no room, and closes on Escape or an outside click, returning focus
 * to the trigger. Uncontrolled by default, or controlled with `open` +
 * `onOpenChange`.
 *
 * @category Overlays
 * @example
 * <Popover content={<Stack gap="sm">…filters…</Stack>} side="bottom">
 *   <Button variant="outline">Filters</Button>
 * </Popover>
 */
export const Popover =React.forwardRef<HTMLDivElement, PopoverProps>(
  ({content, side = 'bottom', open, onOpenChange, className, children, ...props}, ref) => {
    const generatedId = React.useId()
    const {render, nativeButton, childId} = getTrigger(children)
    const triggerId = childId ?? generatedId

    return (
      <div ref={ref} className={clsx(styles.root, className)} {...props}>
        <BasePopover.Root
          open={open}
          onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
        >
          <BasePopover.Trigger
            id={triggerId}
            className={styles.trigger}
            render={render}
            nativeButton={nativeButton}
          />
          <BasePopover.Portal>
            <BasePopover.Positioner className={styles.positioner} side={side}>
              <BasePopover.Popup className={styles.content} aria-labelledby={triggerId}>
                {content}
              </BasePopover.Popup>
            </BasePopover.Positioner>
          </BasePopover.Portal>
        </BasePopover.Root>
      </div>
    )
  },
)

Popover.displayName = 'Popover'
