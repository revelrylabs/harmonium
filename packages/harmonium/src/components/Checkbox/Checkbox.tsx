import * as React from 'react'
import {clsx} from 'clsx'
import {Checkbox as BaseCheckbox} from '@base-ui/react/checkbox'
import {useFieldContext, useRegisterFieldControl} from '../Field/Field'
import {useHiddenInput} from '../../utils/hiddenInput'
import styles from './Checkbox.module.css'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: React.ReactNode
}

/**
 * A checkbox built on Base UI's Checkbox: a `<span role="checkbox">` (the
 * visible box, `.indicator`) plus a hidden native input that carries
 * `name`/`value` for form submission.
 *
 * Prop routing: `className` and `style` go on the wrapping `<label>` (the
 * visible component); `ref` points at the hidden `<input type="checkbox">`;
 * `onChange` receives that input's change event; everything else (`aria-*`,
 * `data-*`, `onFocus`, ...) goes on the `role="checkbox"` element.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      className,
      style,
      id,
      onChange,
      value,
      checked,
      defaultChecked,
      disabled,
      required,
      readOnly,
      name,
      form,
      ...props
    },
    ref,
  ) => {
    const ctx = useFieldContext()
    useRegisterFieldControl()
    const hiddenInput = useHiddenInput(ref, onChange)

    return (
      <label
        className={clsx(styles.root, className)}
        style={style}
        onChange={hiddenInput.onChange}
      >
        <BaseCheckbox.Root
          className={styles.indicator}
          inputRef={hiddenInput.ref}
          id={id ?? ctx?.fieldId}
          name={name}
          form={form}
          value={value === undefined ? undefined : String(value)}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          {...(props as BaseCheckbox.Root.Props)}
        />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
