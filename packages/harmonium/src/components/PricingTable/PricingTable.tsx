import * as React from 'react'
import {clsx} from 'clsx'
import styles from './PricingTable.module.css'

export interface PricingTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns (auto-fits to content by default) */
  columns?: number
}

export const PricingTable = React.forwardRef<HTMLDivElement, PricingTableProps>(
  ({columns, className, children, style, ...props}, ref) => {
    const gridStyle: React.CSSProperties = {
      ...style,
      ...(columns ? {'--pricing-columns': columns} as React.CSSProperties : {}),
    }

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    )
  },
)

PricingTable.displayName = 'PricingTable'

export interface PricingCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether this is the highlighted/recommended plan */
  featured?: boolean
}

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({featured, className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.card, className)}
        data-featured={featured || undefined}
        {...props}
      >
        {children}
      </div>
    )
  },
)

PricingCard.displayName = 'PricingCard'

export interface PricingCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const PricingCardHeader = React.forwardRef<
  HTMLDivElement,
  PricingCardHeaderProps
>(({className, children, ...props}, ref) => (
  <div ref={ref} className={clsx(styles.cardHeader, className)} {...props}>
    {children}
  </div>
))

PricingCardHeader.displayName = 'PricingCardHeader'

export interface PricingCardPriceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Formatted price string (e.g., "$29") */
  amount: string
  /** Billing period (e.g., "/month", "/year") */
  period?: string
}

export const PricingCardPrice = React.forwardRef<
  HTMLDivElement,
  PricingCardPriceProps
>(({amount, period, className, ...props}, ref) => (
  <div ref={ref} className={clsx(styles.cardPrice, className)} {...props}>
    <span className={styles.amount}>{amount}</span>
    {period && <span className={styles.period}>{period}</span>}
  </div>
))

PricingCardPrice.displayName = 'PricingCardPrice'

export interface PricingCardFeaturesProps
  extends React.HTMLAttributes<HTMLUListElement> {}

export const PricingCardFeatures = React.forwardRef<
  HTMLUListElement,
  PricingCardFeaturesProps
>(({className, children, ...props}, ref) => (
  <ul ref={ref} className={clsx(styles.features, className)} {...props}>
    {children}
  </ul>
))

PricingCardFeatures.displayName = 'PricingCardFeatures'

export interface PricingCardFeatureProps
  extends React.HTMLAttributes<HTMLLIElement> {
  /** Whether this feature is included */
  included?: boolean
}

export const PricingCardFeature = React.forwardRef<
  HTMLLIElement,
  PricingCardFeatureProps
>(({included = true, className, children, ...props}, ref) => (
  <li
    ref={ref}
    className={clsx(styles.feature, className)}
    data-included={included}
    {...props}
  >
    <span className={styles.featureCheck} aria-hidden="true">
      {included ? '\u2713' : '\u2717'}
    </span>
    {children}
  </li>
))

PricingCardFeature.displayName = 'PricingCardFeature'

export interface PricingCardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const PricingCardFooter = React.forwardRef<
  HTMLDivElement,
  PricingCardFooterProps
>(({className, children, ...props}, ref) => (
  <div ref={ref} className={clsx(styles.cardFooter, className)} {...props}>
    {children}
  </div>
))

PricingCardFooter.displayName = 'PricingCardFooter'
