import * as React from 'react'
import {clsx} from 'clsx'
import {RadioGroup as BaseRadioGroup} from '@base-ui/react/radio-group'
import {Radio as BaseRadio} from '@base-ui/react/radio'
import {useHiddenInput} from '../../utils/hiddenInput'
import {useRegisterFieldControl} from '../Field/Field'
import styles from './Radio.module.css'

const InRadioGroupContext = React.createContext(false)

type RadioValue = RadioProps['value']

function toValue(value: RadioValue): string {
  return value === undefined ? 'on' : String(value)
}

/**
 * Reads the per-radio props that native radios coordinate through `name`
 * (`name`, `checked`, `defaultChecked`) so the group can own them.
 */
function readRadios(children: React.ReactNode) {
  const radios: RadioProps[] = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
      radios.push(child.props)
    }
  })
  const controlled = radios.some((radio) => radio.checked !== undefined)
  const checked = radios.find((radio) => radio.checked)
  const defaultChecked = radios.find((radio) => radio.defaultChecked)
  return {
    name: radios.find((radio) => radio.name)?.name,
    value: controlled ? (checked ? toValue(checked.value) : null) : undefined,
    defaultValue: defaultChecked ? toValue(defaultChecked.value) : undefined,
  }
}

export interface RadioGroupProps
  extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'defaultValue'> {
  /** Legend/label for the radio group */
  legend?: React.ReactNode
  /** The selected value (controlled). Alternatively set `checked` on a `Radio`. */
  value?: string | null
  /** The initially selected value. Alternatively set `defaultChecked` on a `Radio`. */
  defaultValue?: string
  /** Called with the newly selected value */
  onValueChange?: (value: string) => void
  /** Whether a selection is required to submit the form */
  required?: boolean
  /** Whether the selection can't be changed */
  readOnly?: boolean
}

/**
 * A group of `Radio`s with a `legend`; one can be selected.
 *
 * Built on Base UI's RadioGroup: a `<fieldset
 * role="radiogroup">` with roving focus and arrow-key selection. The `name`
 * for form submission comes from the group, or from the radios' `name`.
 */
export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      legend,
      className,
      children,
      name,
      value,
      defaultValue,
      onValueChange,
      disabled,
      required,
      readOnly,
      form,
      ...props
    },
    ref,
  ) => {
    useRegisterFieldControl()
    const legendId = React.useId()
    const fromRadios = readRadios(children)

    return (
      <InRadioGroupContext.Provider value={true}>
        <BaseRadioGroup<string | null>
          ref={ref as React.Ref<HTMLDivElement>}
          render={<fieldset />}
          className={clsx(styles.group, className)}
          name={name ?? fromRadios.name}
          value={value !== undefined ? value : fromRadios.value}
          defaultValue={defaultValue ?? fromRadios.defaultValue}
          onValueChange={
            onValueChange
              ? (next: string | null) => {
                  if (next !== null) onValueChange(next)
                }
              : undefined
          }
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          form={form}
          {...(legend ? {'aria-labelledby': legendId} : null)}
          {...(props as BaseRadioGroup.Props)}
        >
          {legend && (
            <legend id={legendId} className={styles.legend}>
              {legend}
            </legend>
          )}
          <div className={styles.options}>{children}</div>
        </BaseRadioGroup>
      </InRadioGroupContext.Provider>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: React.ReactNode
}

/**
 * A radio button with a label, used inside a `RadioGroup`.
 *
 * Inside a `RadioGroup` it is Base UI's Radio: a `<span
 * role="radio">` (the `.indicator`) plus a hidden native input that carries
 * `name`/`value` for form submission. Outside a group it falls back to a
 * plain native radio.
 *
 * Prop routing: `className` and `style` go on the wrapping `<label>`; `ref`
 * points at the native `<input type="radio">`; `onChange` receives that
 * input's change event; `name`, `checked` and `defaultChecked` are read by the
 * group; everything else goes on the `role="radio"` element.
 *
 * @category Forms
 * @example
 * <RadioGroup legend="Plan" name="plan" value={plan} onValueChange={setPlan}>
 *   <Radio value="free" label="Free" />
 *   <Radio value="pro" label="Pro" />
 * </RadioGroup>
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      className,
      style,
      id,
      onChange,
      value,
      disabled,
      required,
      readOnly,
      // Owned by the RadioGroup (see readRadios).
      name,
      checked,
      defaultChecked,
      form,
      ...props
    },
    ref,
  ) => {
    const inGroup = React.useContext(InRadioGroupContext)
    const hiddenInput = useHiddenInput(ref, onChange)

    if (!inGroup) {
      return (
        <label className={clsx(styles.root, className)} style={style}>
          <input
            ref={ref}
            type="radio"
            className={styles.input}
            id={id}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            form={form}
            onChange={onChange}
            {...props}
          />
          <span className={styles.indicator} aria-hidden="true" />
          {label && <span className={styles.label}>{label}</span>}
        </label>
      )
    }

    return (
      <label
        className={clsx(styles.root, className)}
        style={style}
        onChange={hiddenInput.onChange}
      >
        <BaseRadio.Root
          className={styles.indicator}
          inputRef={hiddenInput.ref}
          id={id}
          value={toValue(value)}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          {...(props as Omit<BaseRadio.Root.Props, 'value'>)}
        />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    )
  },
)

Radio.displayName = 'Radio'
