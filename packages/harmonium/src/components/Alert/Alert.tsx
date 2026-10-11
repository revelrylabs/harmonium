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

/**
 * A message banner. `info` and `success` use `role="status"` (announced
 * politely); `warning` and `error` use `role="alert"`. With `dismissible` it
 * shows a "Dismiss" button that calls `onDismiss`; removing the alert is up
 * to you.
 *
 * @category Display
 * @example
 * <Alert variant="success">Your changes were saved.</Alert>
 * <Alert variant="error" dismissible onDismiss={() => setError(null)}>
 *   Couldn't save your changes.
 * </Alert>
 */
export const Alert =React.forwardRef<HTMLDivElement, AlertProps>(
  ({variant = 'info', dismissible, onDismiss, className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-variant={variant}
        // Assertive announcements interrupt the user: keep them for problems
        role={variant === 'warning' || variant === 'error' ? 'alert' : 'status'}
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
