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

/**
 * A pulsing placeholder shown while content loads. Numbers for `width` and
 * `height` are pixels. The pulse stops under `prefers-reduced-motion`.
 *
 * @category Display
 * @example
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton width="60%" />
 */
export const Skeleton =React.forwardRef<HTMLDivElement, SkeletonProps>(
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
