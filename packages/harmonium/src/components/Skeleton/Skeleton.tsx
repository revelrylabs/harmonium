import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Skeleton.module.css'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton */
  width?: string | number
  /** Height of the skeleton */
  height?: string | number
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular'
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({width, height, variant = 'text', className, style, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-variant={variant}
        aria-hidden="true"
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    )
  },
)

Skeleton.displayName = 'Skeleton'
