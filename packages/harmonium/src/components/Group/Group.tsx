import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Group.module.css'
import {responsiveDataAttrs} from '../../utils/responsive'
import type {ResponsiveValue} from '../../utils/responsive'

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between items */
  gap?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg' | 'xl'>
  /** Alignment of items on the cross axis */
  align?: ResponsiveValue<'start' | 'center' | 'end' | 'stretch'>
  /** Justification of items on the main axis */
  justify?: ResponsiveValue<'start' | 'center' | 'end' | 'between' | 'around'>
  /** Whether items should wrap */
  wrap?: ResponsiveValue<boolean>
  /** Whether the group should grow to fill available space */
  grow?: ResponsiveValue<boolean>
}

export const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  ({gap = 'md', align, justify, wrap, grow, className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        {...responsiveDataAttrs('gap', gap)}
        {...responsiveDataAttrs('align', align)}
        {...responsiveDataAttrs('justify', justify)}
        {...responsiveDataAttrs('wrap', wrap)}
        {...responsiveDataAttrs('grow', grow)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Group.displayName = 'Group'
