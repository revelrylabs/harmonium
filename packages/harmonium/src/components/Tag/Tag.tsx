import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Tag.module.css'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the tag can be removed */
  removable?: boolean
  /** Callback when the remove button is clicked */
  onRemove?: () => void
  /** Optional icon or avatar rendered before the label */
  icon?: React.ReactNode
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = 'neutral',
      size = 'md',
      removable,
      onRemove,
      icon,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.root, className)}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{children}</span>
        {removable && (
          <button
            type="button"
            className={styles.remove}
            onClick={onRemove}
            aria-label="Remove"
          >
            &times;
          </button>
        )}
      </span>
    )
  },
)

Tag.displayName = 'Tag'
