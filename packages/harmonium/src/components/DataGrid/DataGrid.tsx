import * as React from 'react'
import {clsx} from 'clsx'
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
  /** Current sort state (controlled) */
  sort?: SortState | null
  /** Callback when sort changes */
  onSortChange?: (sort: SortState) => void
  /** Whether to apply striped styling */
  striped?: boolean
  /** Whether rows are hoverable */
  hoverable?: boolean
}

function DataGridInner<T>(
  {
    columns,
    data,
    rowKey,
    sort,
    onSortChange,
    striped,
    hoverable,
    className,
    ...props
  }: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const handleSort = (key: string) => {
    if (!onSortChange) return
    if (sort?.key === key) {
      const next: SortDirection = sort.direction === 'asc' ? 'desc' : sort.direction === 'desc' ? null : 'asc'
      onSortChange(next ? {key, direction: next} : {key, direction: null})
    } else {
      onSortChange({key, direction: 'asc'})
    }
  }

  return (
    <div ref={ref} className={clsx(styles.wrapper, className)} {...props}>
      <table
        className={styles.root}
        data-striped={striped || undefined}
        data-hoverable={hoverable || undefined}
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
          {data.map((row) => (
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
