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
  /** Whether every item grows to share the row's width equally (`flex: 1`) */
  grow?: ResponsiveValue<boolean>
}

/**
 * Lays out items in a row. Props take a single value or a responsive object
 * (`{base: true, md: false}`).
 *
 * @category Layout
 * @example
 * <Group justify="end" gap="sm">
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Save</Button>
 * </Group>
 */
export const Group =React.forwardRef<HTMLDivElement, GroupProps>(
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
