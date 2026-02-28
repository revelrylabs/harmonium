import * as React from 'react'
import {clsx} from 'clsx'
import styles from './EmptyState.module.css'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon or illustration displayed above the title */
  icon?: React.ReactNode
  /** Primary heading text */
  title: string
  /** Supporting description text */
  description?: string
  /** Action element (typically a Button) displayed below the description */
  action?: React.ReactNode
  /** Size of the empty state */
  size?: 'sm' | 'md' | 'lg'
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {icon, title, description, action, size = 'md', className, ...props},
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-size={size}
        {...props}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
    )
  },
)

EmptyState.displayName = 'EmptyState'
