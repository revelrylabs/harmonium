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

/**
 * A label for a category, filter or selection. With `removable` it shows a
 * remove button named "Remove <label>" that calls `onRemove`.
 *
 * @category Display
 * @example
 * <Tag variant="primary">Design</Tag>
 * <Tag removable onRemove={() => removeFilter('bug')}>bug</Tag>
 */
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
    const id = React.useId()
    const labelId = `${id}-label`
    const removeId = `${id}-remove`
    return (
      <span
        ref={ref}
        className={clsx(styles.root, className)}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span id={labelId} className={styles.label}>
          {children}
        </span>
        {removable && (
          <button
            type="button"
            className={styles.remove}
            onClick={onRemove}
            id={removeId}
            // Named "Remove <label>" so each tag's button is distinguishable,
            // whatever the label's content
            aria-label="Remove"
            aria-labelledby={`${removeId} ${labelId}`}
          >
            &times;
          </button>
        )}
      </span>
    )
  },
)

Tag.displayName = 'Tag'
