import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Pagination.module.css'

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Current active page (1-based) */
  page: number
  /** Total number of pages */
  totalPages: number
  /** Callback when page changes */
  onPageChange: (page: number) => void
  /** Maximum number of visible page buttons */
  maxVisible?: number
}

function getPageRange(page: number, totalPages: number, maxVisible: number) {
  const half = Math.floor(maxVisible / 2)
  let start = Math.max(1, page - half)
  const end = Math.min(totalPages, start + maxVisible - 1)
  start = Math.max(1, end - maxVisible + 1)
  const pages: (number | 'ellipsis')[] = []

  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push('ellipsis')
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('ellipsis')
    pages.push(totalPages)
  }

  return pages
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({page, totalPages, onPageChange, maxVisible = 5, className, ...props}, ref) => {
    const pages = getPageRange(page, totalPages, maxVisible)

    return (
      <nav ref={ref} className={clsx(styles.root, className)} aria-label="Pagination" {...props}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          &lsaquo;
        </button>
        {pages.map((item, index) =>
          item === 'ellipsis' ? (
            <span key={`e${index}`} className={styles.ellipsis}>&hellip;</span>
          ) : (
            <button
              key={item}
              type="button"
              className={styles.button}
              data-active={item === page || undefined}
              aria-current={item === page ? 'page' : undefined}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          ),
        )}
        <button
          type="button"
          className={styles.button}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          &rsaquo;
        </button>
      </nav>
    )
  },
)

Pagination.displayName = 'Pagination'
