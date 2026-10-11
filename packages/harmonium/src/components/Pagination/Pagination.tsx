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

/**
 * Page numbers to show, with `'ellipsis'` markers for skipped runs. At most
 * `maxVisible` page buttons are returned; the first and last pages are always
 * included once there is room for them.
 */
function getPageRange(
  page: number,
  totalPages: number,
  maxVisible: number,
): (number | 'ellipsis')[] {
  const max = Math.max(1, Math.floor(maxVisible))
  const range = (from: number, to: number) =>
    Array.from({length: to - from + 1}, (_, i) => from + i)

  if (totalPages <= max) return range(1, totalPages)

  // Too few slots to pin the first and last pages: show a window around page.
  if (max < 3) {
    const start = Math.min(
      Math.max(1, page - Math.floor((max - 1) / 2)),
      totalPages - max + 1,
    )
    return range(start, start + max - 1)
  }

  // First and last are pinned; the remaining slots form a window around page.
  const windowSize = max - 2
  const start = Math.min(
    Math.max(2, page - Math.floor((windowSize - 1) / 2)),
    totalPages - windowSize,
  )
  const end = start + windowSize - 1
  const pages: (number | 'ellipsis')[] = [1]
  if (start > 2) pages.push('ellipsis')
  pages.push(...range(start, end))
  if (end < totalPages - 1) pages.push('ellipsis')
  pages.push(totalPages)
  return pages
}

/**
 * Previous/next buttons and page numbers. Shows at most `maxVisible` page
 * buttons, always including the first and last page, with an ellipsis for
 * skipped pages. It's controlled: update `page` in `onPageChange`.
 *
 * @category Navigation
 * @example
 * <Pagination page={page} totalPages={20} onPageChange={setPage} />
 */
export const Pagination =React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page: pageProp,
      totalPages: totalPagesProp,
      onPageChange,
      maxVisible = 5,
      className,
      ...props
    },
    ref,
  ) => {
    // Guard out-of-range input so the controls never point past either end.
    const totalPages = Math.max(1, Math.floor(totalPagesProp) || 1)
    const page = Math.min(Math.max(1, Math.floor(pageProp) || 1), totalPages)
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
            <span key={`e${index}`} className={styles.ellipsis} aria-hidden="true">
              &hellip;
            </span>
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
