import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Container.module.css'
import {responsiveDataAttrs} from '../../utils/responsive'
import type {ResponsiveValue} from '../../utils/responsive'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max-width size */
  size?: ResponsiveValue<'sm' | 'md' | 'lg' | 'xl' | 'full'>
  /** Horizontal padding */
  padding?: ResponsiveValue<'none' | 'sm' | 'md' | 'lg'>
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({size = 'lg', padding = 'md', className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        {...responsiveDataAttrs('size', size)}
        {...responsiveDataAttrs('padding', padding)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Container.displayName = 'Container'
