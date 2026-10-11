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
  HTMLAnchorElement | HTMLSpanElement,
  BreadcrumbItemProps
>(({active, className, children, ...props}, ref) => {
  if (active) {
    // The current page isn't a link: drop link-only attributes, keep the rest.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      href,
      target,
      rel,
      download,
      hrefLang,
      ping,
      referrerPolicy,
      type,
      media,
      ...spanProps
    } = props
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return (
      <span
        ref={ref}
        className={clsx(styles.link, styles.active, className)}
        aria-current="page"
        {...(spanProps as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {children}
      </span>
    )
  }

  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      className={clsx(styles.link, className)}
      {...props}
    >
      {children}
    </a>
  )
})

BreadcrumbItem.displayName = 'BreadcrumbItem'
