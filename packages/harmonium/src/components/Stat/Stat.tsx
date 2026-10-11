import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Stat.module.css'

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label describing the metric */
  label: string
  /** Formatted value to display */
  value: string | number
  /** Change indicator (e.g., "+12%", "-3.2%") */
  change?: string
  /** Trend direction for visual styling */
  trend?: 'up' | 'down' | 'neutral'
  /** Optional icon or sparkline rendered alongside the value */
  icon?: React.ReactNode
}

/**
 * A key metric: label, value and an optional change colored by `trend`.
 *
 * @category Display
 * @example
 * <Grid columns={{base: 1, md: 3}} gap="md">
 *   <Stat label="Revenue" value="$48,200" change="+12%" trend="up" />
 *   <Stat label="Churn" value="2.1%" change="-0.4%" trend="down" />
 * </Grid>
 */
export const Stat =React.forwardRef<HTMLDivElement, StatProps>(
  ({label, value, change, trend, icon, className, ...props}, ref) => {
    return (
      <div ref={ref} className={clsx(styles.root, className)} {...props}>
        <div className={styles.header}>
          <span className={styles.label}>{label}</span>
          {icon && <span className={styles.icon}>{icon}</span>}
        </div>
        <div className={styles.value}>{value}</div>
        {change && (
          <div className={styles.change} data-trend={trend || 'neutral'}>
            {trend === 'up' && <span aria-hidden="true">&#8593;</span>}
            {trend === 'down' && <span aria-hidden="true">&#8595;</span>}
            {change}
          </div>
        )}
      </div>
    )
  },
)

Stat.displayName = 'Stat'
