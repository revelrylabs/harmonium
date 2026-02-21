import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Table.module.css'

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Whether to apply striped row styling */
  striped?: boolean
  /** Whether to apply hover styling to rows */
  hoverable?: boolean
  /** Whether the table should scroll horizontally */
  responsive?: boolean
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({striped, hoverable, responsive, className, children, ...props}, ref) => {
    const table = (
      <table
        ref={ref}
        className={clsx(styles.root, className)}
        data-striped={striped || undefined}
        data-hoverable={hoverable || undefined}
        {...props}
      >
        {children}
      </table>
    )

    if (responsive) {
      return <div className={styles.responsive}>{table}</div>
    }

    return table
  },
)

Table.displayName = 'Table'

export const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <thead ref={ref} className={clsx(styles.head, className)} {...props} />
))
TableHead.displayName = 'TableHead'

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <tbody ref={ref} className={clsx(styles.body, className)} {...props} />
))
TableBody.displayName = 'TableBody'

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({className, ...props}, ref) => (
  <tr ref={ref} className={clsx(styles.row, className)} {...props} />
))
TableRow.displayName = 'TableRow'

export const TableHeader = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
  <th ref={ref} className={clsx(styles.headerCell, className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
  <td ref={ref} className={clsx(styles.cell, className)} {...props} />
))
TableCell.displayName = 'TableCell'
