import * as React from 'react'
import {clsx} from 'clsx'
import {Field as BaseField} from '@base-ui/react/field'
import {useFieldControlProps} from '../Field/Field'
import styles from './Input.module.css'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * A native `<input>`. Inside a `<Field>` it is labelled by `FieldLabel`,
 * described by `FieldDescription`/`FieldError` and marked invalid by
 * `<Field error>` (via Base UI's `Field.Control`).
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({size = 'md', className, id, ...props}, ref) => {
    const fieldProps = useFieldControlProps(id)

    return (
      <BaseField.Control
        ref={ref as React.Ref<HTMLElement>}
        className={clsx(styles.root, className)}
        data-size={size}
        {...fieldProps}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
