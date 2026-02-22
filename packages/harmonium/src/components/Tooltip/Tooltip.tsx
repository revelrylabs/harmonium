import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Tooltip.module.css'

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Tooltip content */
  content: React.ReactNode
  /** Side of the trigger to show the tooltip */
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({content, side = 'top', className, children, ...props}, ref) => {
    const [visible, setVisible] = React.useState(false)
    const tooltipId = React.useId()

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && visible) {
            setVisible(false)
          }
        }}
        aria-describedby={visible ? tooltipId : undefined}
        {...props}
      >
        {children}
        {visible && (
          <div className={styles.content} data-side={side} role="tooltip" id={tooltipId}>
            {content}
          </div>
        )}
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'
