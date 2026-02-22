import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Slider.module.css'

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Whether to show the current value label */
  showValue?: boolean
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({size = 'md', showValue, className, value, defaultValue, ...props}, ref) => {
    const [internal, setInternal] = React.useState(defaultValue ?? 50)
    const displayValue = value ?? internal

    return (
      <div className={clsx(styles.root, className)} data-size={size}>
        <input
          ref={ref}
          type="range"
          className={styles.input}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={(event) => {
            setInternal(Number(event.target.value))
            props.onChange?.(event)
          }}
          {...props}
        />
        {showValue && <span className={styles.value}>{displayValue}</span>}
      </div>
    )
  },
)

Slider.displayName = 'Slider'
