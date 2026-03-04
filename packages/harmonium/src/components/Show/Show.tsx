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

export const Show = React.forwardRef<HTMLDivElement, ShowProps>(
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
