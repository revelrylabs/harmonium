import * as React from 'react'
import {clsx} from 'clsx'
import {scrollRegionProps, useScrollRegion} from '../Table/Table'
import {useMergedRef} from '../../utils/hiddenInput'
import styles from './DataGrid.module.css'

export interface DataGridColumn<T> {
  /** Unique key for the column */
  key: string
  /** Column header label */
  header: string
  /** Function to render cell content */
  render?: (row: T) => React.ReactNode
  /** Whether the column is sortable */
  sortable?: boolean
  /**
   * Value to sort by when DataGrid sorts `data` itself (uncontrolled sorting).
   * Defaults to `row[key]`.
   */
  sortValue?: (row: T) => unknown
  /** Column width */
  width?: string
}

export type SortDirection = 'asc' | 'desc' | null

export interface SortState {
  key: string
  direction: SortDirection
}

export interface DataGridProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Column definitions */
  columns: DataGridColumn<T>[]
  /** Row data */
  data: T[]
  /** Function to get a unique key for each row */
  rowKey: (row: T) => string | number
  /**
   * Current sort state (controlled). When set, `data` is rendered in the
   * order given; sort it yourself in `onSortChange`. Leave it out to let
   * DataGrid sort `data` itself.
   */
  sort?: SortState | null
  /** Initial sort state when uncontrolled */
  defaultSort?: SortState | null
  /** Callback when sort changes */
  onSortChange?: (sort: SortState) => void
  /** Extra props for the `<table>` element (the outer `<div>` gets the rest) */
  tableProps?: React.TableHTMLAttributes<HTMLTableElement>
  /** Whether to apply striped styling */
  striped?: boolean
  /** Whether rows are hoverable */
  hoverable?: boolean
}

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
})

function compareValues(a: unknown, b: unknown): number {
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime()
  if (typeof a === 'number' && typeof b === 'number') return a - b
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return Number(a) - Number(b)
  }
  return collator.compare(String(a), String(b))
}

const isEmpty = (value: unknown) => value == null || value === ''

function sortRows<T>(
  data: T[],
  columns: DataGridColumn<T>[],
  sort: SortState | null | undefined,
): T[] {
  if (!sort?.direction) return data
  const column = columns.find((col) => col.key === sort.key)
  if (!column) return data
  const getValue =
    column.sortValue ??
    ((row: T) => (row as Record<string, unknown>)[column.key])
  const factor = sort.direction === 'desc' ? -1 : 1
  return data
    .map((row) => ({row, value: getValue(row)}))
    .sort((a, b) => {
      // Empty values always sort last.
      if (isEmpty(a.value) || isEmpty(b.value)) {
        return Number(isEmpty(a.value)) - Number(isEmpty(b.value))
      }
      return compareValues(a.value, b.value) * factor
    })
    .map(({row}) => row)
}

function DataGridInner<T>(
  {
    columns,
    data,
    rowKey,
    sort: sortProp,
    defaultSort = null,
    onSortChange,
    striped,
    hoverable,
    tableProps,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...props
  }: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const controlled = sortProp !== undefined
  const [internalSort, setInternalSort] = React.useState<SortState | null>(
    defaultSort,
  )
  const sort = controlled ? sortProp : internalSort
  const region = useScrollRegion<HTMLDivElement>()
  const wrapperRef = useMergedRef(ref, region.ref)

  const rows = React.useMemo(
    () => (controlled ? data : sortRows(data, columns, internalSort)),
    [controlled, data, columns, internalSort],
  )

  const handleSort = (key: string) => {
    let next: SortState
    if (sort?.key === key) {
      const direction: SortDirection =
        sort.direction === 'asc'
          ? 'desc'
          : sort.direction === 'desc'
            ? null
            : 'asc'
      next = {key, direction}
    } else {
      next = {key, direction: 'asc'}
    }
    if (!controlled) setInternalSort(next)
    onSortChange?.(next)
  }

  return (
    <div
      ref={wrapperRef}
      className={clsx(styles.wrapper, className)}
      {...scrollRegionProps(region.overflowing, ariaLabel, ariaLabelledBy)}
      {...props}
    >
      <table
        {...tableProps}
        className={clsx(styles.root, tableProps?.className)}
        data-striped={striped || undefined}
        data-hoverable={hoverable || undefined}
        aria-label={tableProps?.['aria-label'] ?? ariaLabel}
        aria-labelledby={tableProps?.['aria-labelledby'] ?? ariaLabelledBy}
        aria-describedby={tableProps?.['aria-describedby'] ?? ariaDescribedBy}
      >
        <thead className={styles.head}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={styles.headerCell}
                style={col.width ? {width: col.width} : undefined}
                aria-sort={
                  sort?.key === col.key && sort.direction
                    ? sort.direction === 'asc' ? 'ascending' : 'descending'
                    : undefined
                }
              >
                {col.sortable ? (
                  <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() => handleSort(col.key)}
                  >
                    {col.header}
                    <span className={styles.sortIcon} aria-hidden="true">
                      {sort?.key === col.key && sort.direction === 'asc' && '▲'}
                      {sort?.key === col.key && sort.direction === 'desc' && '▼'}
                      {(!sort || sort.key !== col.key || !sort.direction) && '⇅'}
                    </span>
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {rows.map((row) => (
            <tr key={rowKey(row)} className={styles.row}>
              {columns.map((col) => (
                <td key={col.key} className={styles.cell}>
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const DataGrid = React.forwardRef(DataGridInner) as <T>(
  props: DataGridProps<T> & {ref?: React.Ref<HTMLDivElement>},
) => React.ReactElement
