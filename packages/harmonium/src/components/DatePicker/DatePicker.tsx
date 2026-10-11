import * as React from 'react'
import {clsx} from 'clsx'
import {Field as BaseField} from '@base-ui/react/field'
import {useFieldControlProps} from '../Field/Field'
import styles from './DatePicker.module.css'

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

/** A native `<input type="date">`, wired to the surrounding `<Field>`. */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({size = 'md', className, id, ...props}, ref) => {
    const fieldProps = useFieldControlProps(id)

    return (
      <BaseField.Control
        ref={ref as React.Ref<HTMLElement>}
        type="date"
        className={clsx(styles.root, className)}
        data-size={size}
        {...fieldProps}
        {...props}
      />
    )
  },
)

DatePicker.displayName = 'DatePicker'
