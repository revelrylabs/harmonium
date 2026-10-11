import * as React from 'react'
import {clsx} from 'clsx'
import {Switch as BaseSwitch} from '@base-ui/react/switch'
import {useFieldContext, useRegisterFieldControl} from '../Field/Field'
import {useHiddenInput} from '../../utils/hiddenInput'
import styles from './Switch.module.css'

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'role' | 'size'> {
  /** Label text */
  label?: React.ReactNode
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * An on/off switch with a label.
 *
 * Built on Base UI's Switch: a `<span role="switch">` (the `.track`)
 * with a `.thumb`, plus a hidden native checkbox that carries `name`/`value`
 * for form submission.
 *
 * Prop routing: `className` and `style` go on the wrapping `<label>` (the
 * visible component); `ref` points at the hidden `<input type="checkbox">`;
 * `onChange` receives that input's change event; everything else (`aria-*`,
 * `data-*`, `onFocus`, ...) goes on the `role="switch"` element.
 *
 * @category Forms
 * @example
 * <Switch label="Email notifications" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
 * <Switch label="Dark mode" size="sm" defaultChecked />
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      size = 'md',
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
        data-size={size}
        onChange={hiddenInput.onChange}
      >
        <BaseSwitch.Root
          className={styles.track}
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
          {...(props as BaseSwitch.Root.Props)}
        >
          <BaseSwitch.Thumb className={styles.thumb} />
        </BaseSwitch.Root>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    )
  },
)

Switch.displayName = 'Switch'
