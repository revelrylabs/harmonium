import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Grid.module.css'
import {
  responsiveDataAttrs,
  responsiveStyles,
  hasResponsiveOverrides,
} from '../../utils/responsive'
import type {ResponsiveValue} from '../../utils/responsive'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: ResponsiveValue<number | string>
  /** Gap between grid items */
  gap?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg' | 'xl'>
  /** Alignment of items within their grid area */
  align?: ResponsiveValue<'start' | 'center' | 'end' | 'stretch'>
}

const formatColumns = (v: string | number) =>
  typeof v === 'number' ? `repeat(${v}, 1fr)` : String(v)

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({columns = 12, gap = 'md', align, className, style, children, ...props}, ref) => {
    const columnStyles = responsiveStyles('grid-columns', columns, formatColumns)
    const gridStyle = {
      ...style,
      ...columnStyles,
    } as React.CSSProperties

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        {...responsiveDataAttrs('gap', gap)}
        {...responsiveDataAttrs('align', align)}
        data-responsive-columns={hasResponsiveOverrides(columns) || undefined}
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
  span?: ResponsiveValue<number | string>
}

const formatSpan = (v: string | number) =>
  typeof v === 'number' ? `span ${v}` : String(v)

export const GridCol = React.forwardRef<HTMLDivElement, GridColProps>(
  ({span, className, style, children, ...props}, ref) => {
    const spanStyles = responsiveStyles('col-span', span, formatSpan)
    const colStyle =
      Object.keys(spanStyles).length > 0
        ? ({...style, ...spanStyles} as React.CSSProperties)
        : style

    return (
      <div
        ref={ref}
        className={clsx(styles.col, className)}
        data-responsive-span={hasResponsiveOverrides(span) || undefined}
        style={colStyle}
        {...props}
      >
        {children}
      </div>
    )
  },
)

GridCol.displayName = 'GridCol'
