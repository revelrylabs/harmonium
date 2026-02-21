import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Grid.module.css'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: number | string
  /** Gap between grid items */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Alignment of items within their grid area */
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({columns = 12, gap = 'md', align, className, style, children, ...props}, ref) => {
    const gridStyle = {
      ...style,
      '--grid-columns': typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
    } as React.CSSProperties

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-gap={gap}
        data-align={align || undefined}
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Grid.displayName = 'Grid'

export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span */
  span?: number | string
}

export const GridCol = React.forwardRef<HTMLDivElement, GridColProps>(
  ({span, className, style, children, ...props}, ref) => {
    const colStyle = span
      ? ({...style, '--col-span': typeof span === 'number' ? `span ${span}` : span} as React.CSSProperties)
      : style

    return (
      <div
        ref={ref}
        className={clsx(styles.col, className)}
        style={colStyle}
        {...props}
      >
        {children}
      </div>
    )
  },
)

GridCol.displayName = 'GridCol'
