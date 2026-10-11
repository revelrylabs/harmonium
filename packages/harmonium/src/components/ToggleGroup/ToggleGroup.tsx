import * as React from 'react'
import {ToggleGroup as BaseToggleGroup} from '@base-ui/react/toggle-group'
import {Toggle} from '@base-ui/react/toggle'
import {clsx} from 'clsx'
import styles from './ToggleGroup.module.css'

export interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /** Currently selected value (controlled) */
  value?: string
  /** Default selected value (uncontrolled) */
  defaultValue?: string
  /** Callback when the selected value changes */
  onValueChange?: (value: string) => void
  /** Size of the toggle group */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * A single-select group of toggle buttons built on Base UI: the group is one
 * tab stop, arrow keys (and Home/End) move focus between items, and each item
 * reports its state with `aria-pressed`. Pressing the selected item again
 * keeps it selected.
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {value, defaultValue, onValueChange, size = 'md', className, ...props},
    ref,
  ) => {
    const [internal, setInternal] = React.useState(defaultValue ?? '')
    const current = value ?? internal
    const groupValue = React.useMemo(() => (current ? [current] : []), [current])

    return (
      <BaseToggleGroup
        ref={ref}
        className={clsx(styles.root, className)}
        data-size={size}
        value={groupValue}
        onValueChange={(next) => {
          // Single-select: ignore the "unpress the selected item" change
          const selected = next[0]
          if (selected === undefined || selected === current) return
          if (value === undefined) setInternal(selected)
          onValueChange?.(selected)
        }}
        {...props}
      />
    )
  },
)

ToggleGroup.displayName = 'ToggleGroup'

export interface ToggleGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Value of this item */
  value: string
}

export const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({value, className, ...props}, ref) => (
  <Toggle
    ref={ref}
    value={value}
    className={clsx(styles.item, className)}
    // Keep the `data-state` styling hook alongside Base UI's `data-pressed`.
    render={(renderProps, state) => (
      <button
        {...renderProps}
        data-state={state.pressed ? 'active' : 'inactive'}
      />
    )}
    {...props}
  />
))

ToggleGroupItem.displayName = 'ToggleGroupItem'
