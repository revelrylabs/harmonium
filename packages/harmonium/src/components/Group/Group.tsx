import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Group.module.css'

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between items */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Alignment of items on the cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Justification of items on the main axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  /** Whether items should wrap */
  wrap?: boolean
  /** Whether the group should grow to fill available space */
  grow?: boolean
}

export const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  (
    {gap = 'md', align, justify, wrap, grow, className, children, ...props},
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-gap={gap}
        data-align={align || undefined}
        data-justify={justify || undefined}
        data-wrap={wrap || undefined}
        data-grow={grow || undefined}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Group.displayName = 'Group'
