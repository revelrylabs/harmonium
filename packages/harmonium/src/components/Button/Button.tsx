import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Button.module.css'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the button should take full width */
  expanded?: boolean
}

/**
 * A native `<button>` with variants and sizes.
 *
 * @category Actions
 * @example
 * <Button onClick={save}>Save</Button>
 * <Button variant="outline" disabled>Cancel</Button>
 * <Button variant="ghost" size="sm">Edit</Button>
 * <Button expanded>Full width</Button>
 */
export const Button =React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      expanded,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(styles.root, className)}
        data-variant={variant}
        data-size={size}
        data-expanded={expanded || undefined}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
