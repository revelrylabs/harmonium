import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Stack.module.css'
import {responsiveDataAttrs} from '../../utils/responsive'
import type {ResponsiveValue} from '../../utils/responsive'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the stack */
  direction?: ResponsiveValue<'vertical' | 'horizontal'>
  /** Gap between items */
  gap?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg' | 'xl'>
  /** Alignment of items on the cross axis */
  align?: ResponsiveValue<'start' | 'center' | 'end' | 'stretch'>
  /** Justification of items on the main axis */
  justify?: ResponsiveValue<'start' | 'center' | 'end' | 'between' | 'around'>
  /** Whether items should wrap */
  wrap?: ResponsiveValue<boolean>
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 'md',
      align,
      justify,
      wrap,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        {...responsiveDataAttrs('direction', direction)}
        {...responsiveDataAttrs('gap', gap)}
        {...responsiveDataAttrs('align', align)}
        {...responsiveDataAttrs('justify', justify)}
        {...responsiveDataAttrs('wrap', wrap)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Stack.displayName = 'Stack'
