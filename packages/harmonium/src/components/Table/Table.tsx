import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Table.module.css'

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Whether to apply striped row styling */
  striped?: boolean
  /** Whether to apply hover styling to rows */
  hoverable?: boolean
  /**
   * Whether the table should scroll horizontally. When it overflows, the
   * scroll container becomes keyboard focusable and, if the table has an
   * `aria-label`/`aria-labelledby`, a region with the same name.
   */
  responsive?: boolean
}

/**
 * Tracks whether a scroll container overflows, so it can be made keyboard
 * focusable (and named) only when there is something to scroll.
 * @internal Shared with DataGrid; not part of the public API.
 */
export function useScrollRegion<T extends HTMLElement>(enabled = true) {
  const ref = React.useRef<T>(null)
  const [overflowing, setOverflowing] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!enabled || !el) {
      setOverflowing(false)
      return
    }
    const measure = () =>
      setOverflowing(
        el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight,
      )
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    if (el.firstElementChild) observer.observe(el.firstElementChild)
    return () => observer.disconnect()
  }, [enabled])

  return {ref, overflowing}
}

/**
 * Props for a scroll container: when it overflows it becomes a focusable
 * region (so keyboard users can scroll it), named after the table.
 * @internal
 */
export function scrollRegionProps(
  overflowing: boolean,
  label: string | undefined,
  labelledBy: string | undefined,
): React.HTMLAttributes<HTMLDivElement> {
  if (!overflowing) return {}
  const named = Boolean(label || labelledBy)
  return {
    tabIndex: 0,
    role: named ? 'region' : undefined,
    'aria-label': labelledBy ? undefined : label,
    'aria-labelledby': labelledBy,
  }
}

/**
 * A semantic HTML table built from `TableHead`, `TableBody`, `TableRow`,
 * `TableHeader` (`<th>`) and `TableCell` (`<td>`). For column definitions
 * and sorting, use `DataGrid`.
 *
 * @category Data
 * @example
 * <Table striped hoverable responsive aria-label="Invoices">
 *   <TableHead>
 *     <TableRow><TableHeader>Invoice</TableHeader><TableHeader>Amount</TableHeader></TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow><TableCell>#1024</TableCell><TableCell>$120</TableCell></TableRow>
 *   </TableBody>
 * </Table>
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({striped, hoverable, responsive, className, children, ...props}, ref) => {
    const region = useScrollRegion<HTMLDivElement>(Boolean(responsive))

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
      return (
        <div
          ref={region.ref}
          className={styles.responsive}
          {...scrollRegionProps(
            region.overflowing,
            props['aria-label'],
            props['aria-labelledby'],
          )}
        >
          {table}
        </div>
      )
    }

    return table
  },
)

Table.displayName = 'Table'

/** The `<thead>` of a `Table`. */
export const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <thead ref={ref} className={clsx(styles.head, className)} {...props} />
))
TableHead.displayName = 'TableHead'

/** The `<tbody>` of a `Table`. */
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <tbody ref={ref} className={clsx(styles.body, className)} {...props} />
))
TableBody.displayName = 'TableBody'

/** A `<tr>` of a `Table`. */
export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({className, ...props}, ref) => (
  <tr ref={ref} className={clsx(styles.row, className)} {...props} />
))
TableRow.displayName = 'TableRow'

/** A header cell (`<th>`) of a `Table`. */
export const TableHeader = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
  <th ref={ref} className={clsx(styles.headerCell, className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

/** A data cell (`<td>`) of a `Table`. */
export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
  <td ref={ref} className={clsx(styles.cell, className)} {...props} />
))
TableCell.displayName = 'TableCell'
