import * as React from 'react'
import {clsx} from 'clsx'
import styles from './ToggleGroup.module.css'

interface ToggleGroupContextValue {
  value: string
  setValue: (value: string) => void
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null,
)

function useToggleGroupContext() {
  const ctx = React.useContext(ToggleGroupContext)
  if (!ctx)
    throw new Error('ToggleGroupItem must be used within <ToggleGroup>')
  return ctx
}

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Currently selected value (controlled) */
  value?: string
  /** Default selected value (uncontrolled) */
  defaultValue?: string
  /** Callback when the selected value changes */
  onValueChange?: (value: string) => void
  /** Size of the toggle group */
  size?: 'sm' | 'md' | 'lg'
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      size = 'md',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internal, setInternal] = React.useState(defaultValue ?? '')
    const current = value ?? internal

    const setValue = React.useCallback(
      (v: string) => {
        if (value === undefined) setInternal(v)
        onValueChange?.(v)
      },
      [value, onValueChange],
    )

    return (
      <ToggleGroupContext.Provider value={{value: current, setValue}}>
        <div
          ref={ref}
          role="radiogroup"
          className={clsx(styles.root, className)}
          data-size={size}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    )
  },
)

ToggleGroup.displayName = 'ToggleGroup'

export interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Value of this item */
  value: string
}

export const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({value, className, children, ...props}, ref) => {
  const {value: selected, setValue} = useToggleGroupContext()
  const isActive = selected === value

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      className={clsx(styles.item, className)}
      aria-checked={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </button>
  )
})

ToggleGroupItem.displayName = 'ToggleGroupItem'
