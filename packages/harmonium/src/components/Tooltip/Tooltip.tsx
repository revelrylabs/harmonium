import * as React from 'react'
import {Tooltip as BaseTooltip} from '@base-ui/react/tooltip'
import {clsx} from 'clsx'
import styles from './Tooltip.module.css'

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Tooltip content */
  content: React.ReactNode
  /** Side of the trigger to show the tooltip */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /** Milliseconds to wait before showing the tooltip on hover (focus shows it immediately) */
  delay?: number
}

type DescribableElement = React.ReactElement<{'aria-describedby'?: string}>

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({content, side = 'top', delay = 0, className, children, ...props}, ref) => {
    const [open, setOpen] = React.useState(false)
    const tooltipId = React.useId()
    // Typed as a button for Base UI; any element the child renders works.
    const triggerRef = React.useRef<HTMLButtonElement>(null)

    const handleOpenChange = (
      next: boolean,
      details: BaseTooltip.Root.ChangeEventDetails,
    ) => {
      // Stay open while the trigger has keyboard focus, even if the pointer leaves.
      const focused =
        triggerRef.current !== null && triggerRef.current === document.activeElement
      if (!next && details.reason === 'trigger-hover' && focused) return
      setOpen(next)
    }

    // The focusable child is the trigger, so the description reaches it
    // (not a wrapper). Text children get a focusable <span>.
    const child: DescribableElement = React.isValidElement(children) ? (
      (children as DescribableElement)
    ) : (
      <span tabIndex={0}>{children}</span>
    )
    const describedBy =
      clsx(child.props['aria-describedby'], open && tooltipId) || undefined

    return (
      <div ref={ref} className={clsx(styles.root, className)} {...props}>
        <BaseTooltip.Root open={open} onOpenChange={handleOpenChange}>
          <BaseTooltip.Trigger
            ref={triggerRef}
            delay={delay}
            render={React.cloneElement(child, {'aria-describedby': describedBy})}
          />
          <BaseTooltip.Portal>
            <BaseTooltip.Positioner className={styles.positioner} side={side}>
              <BaseTooltip.Popup className={styles.content} role="tooltip" id={tooltipId}>
                {content}
              </BaseTooltip.Popup>
            </BaseTooltip.Positioner>
          </BaseTooltip.Portal>
        </BaseTooltip.Root>
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'
