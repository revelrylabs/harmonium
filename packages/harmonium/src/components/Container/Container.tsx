import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Container.module.css'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max-width size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Horizontal padding */
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({size = 'lg', padding = 'md', className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-size={size}
        data-padding={padding}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Container.displayName = 'Container'
