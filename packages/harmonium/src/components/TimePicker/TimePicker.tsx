import * as React from 'react'
import {clsx} from 'clsx'
import {Field as BaseField} from '@base-ui/react/field'
import {useFieldControlProps} from '../Field/Field'
import styles from './TimePicker.module.css'

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

/** A native `<input type="time">`, wired to the surrounding `<Field>`. */
export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({size = 'md', className, id, ...props}, ref) => {
    const fieldProps = useFieldControlProps(id)

    return (
      <BaseField.Control
        ref={ref as React.Ref<HTMLElement>}
        type="time"
        className={clsx(styles.root, className)}
        data-size={size}
        {...fieldProps}
        {...props}
      />
    )
  },
)

TimePicker.displayName = 'TimePicker'
