import * as React from 'react'
import {clsx} from 'clsx'
import {Field as BaseField} from '@base-ui/react/field'
import {useFieldControlProps} from '../Field/Field'
import styles from './Select.module.css'

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Placeholder option text. It is shown (and submits an empty value) until an
   * option is picked, in both controlled and uncontrolled use.
   */
  placeholder?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * A native `<select>`, wired to the surrounding `<Field>`. Pass `<option>`
 * elements as children.
 *
 * @category Forms
 * @example
 * <Field>
 *   <FieldLabel>Role</FieldLabel>
 *   <Select placeholder="Choose a role" value={role} onChange={(e) => setRole(e.target.value)}>
 *     <option value="admin">Admin</option>
 *     <option value="member">Member</option>
 *   </Select>
 * </Field>
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({placeholder, size = 'md', className, id, children, ...props}, ref) => {
    const fieldProps = useFieldControlProps(id)
    // Without a default, an uncontrolled <select> selects its first enabled
    // option and the (disabled) placeholder never shows.
    const uncontrolledPlaceholder =
      placeholder !== undefined &&
      props.value === undefined &&
      props.defaultValue === undefined &&
      !props.multiple

    return (
      <BaseField.Control
        ref={ref as React.Ref<HTMLElement>}
        render={<select />}
        className={clsx(styles.root, className)}
        data-size={size}
        {...fieldProps}
        {...(uncontrolledPlaceholder ? {defaultValue: ''} : null)}
        {...(props as BaseField.Control.Props)}
      >
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </BaseField.Control>
    )
  },
)

Select.displayName = 'Select'
