import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Show.module.css'
import type {Breakpoint} from '../../utils/responsive'

export interface ShowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show content at this breakpoint and above */
  above?: Breakpoint
  /** Show content below this breakpoint (hidden at and above) */
  below?: Breakpoint
}

/**
 * Shows its children only at some screen widths, using the `breakpoints`
 * (sm 640px, md 768px, lg 1024px, xl 1280px). It hides them with CSS, so they
 * are still rendered.
 *
 * @category Layout
 * @example
 * <Show below="md"><MobileNav /></Show>
 * <Show above="md"><DesktopNav /></Show>
 */
export const Show =React.forwardRef<HTMLDivElement, ShowProps>(
  ({above, below, className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-above={above || undefined}
        data-below={below || undefined}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Show.displayName = 'Show'
