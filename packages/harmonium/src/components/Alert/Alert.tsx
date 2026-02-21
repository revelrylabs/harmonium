import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Alert.module.css'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: 'info' | 'success' | 'warning' | 'error'
  /** Whether the alert can be dismissed */
  dismissible?: boolean
  /** Callback when the alert is dismissed */
  onDismiss?: () => void
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({variant = 'info', dismissible, onDismiss, className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-variant={variant}
        role="alert"
        {...props}
      >
        <div className={styles.content}>{children}</div>
        {dismissible && (
          <button
            type="button"
            className={styles.dismiss}
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            &times;
          </button>
        )}
      </div>
    )
  },
)

Alert.displayName = 'Alert'
