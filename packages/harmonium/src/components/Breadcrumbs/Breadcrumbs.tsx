import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Breadcrumbs.module.css'

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Custom separator between items */
  separator?: React.ReactNode
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({separator = '/', className, children, ...props}, ref) => {
    const items = React.Children.toArray(children)

    return (
      <nav ref={ref} className={clsx(styles.root, className)} aria-label="Breadcrumb" {...props}>
        <ol className={styles.list}>
          {items.map((child, index) => (
            <li key={index} className={styles.item}>
              {child}
              {index < items.length - 1 && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  },
)

Breadcrumbs.displayName = 'Breadcrumbs'

export interface BreadcrumbItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Whether this is the current/active page */
  active?: boolean
}

export const BreadcrumbItem = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbItemProps
>(({active, className, children, ...props}, ref) => {
  if (active) {
    return (
      <span className={clsx(styles.link, styles.active, className)} aria-current="page">
        {children}
      </span>
    )
  }

  return (
    <a ref={ref} className={clsx(styles.link, className)} {...props}>
      {children}
    </a>
  )
})

BreadcrumbItem.displayName = 'BreadcrumbItem'
