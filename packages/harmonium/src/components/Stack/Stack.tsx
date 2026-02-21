import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Stack.module.css'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the stack */
  direction?: 'vertical' | 'horizontal'
  /** Gap between items */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Alignment of items on the cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Justification of items on the main axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  /** Whether items should wrap */
  wrap?: boolean
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
        data-direction={direction}
        data-gap={gap}
        data-align={align || undefined}
        data-justify={justify || undefined}
        data-wrap={wrap || undefined}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Stack.displayName = 'Stack'
