import React from 'react'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import CheckableFieldset from './CheckableFieldset'

const BOOL_PROPS_TO_CLASS_NAMES = {
  stacked: ['rev-Checkbox--stacked'],
  stackedForSmall: ['rev-Checkbox--stackedForSmall'],
  stackedForMedium: ['rev-Checkbox--stackedForMedium'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Error message or boolean to indicate error state
   */
  error?: boolean | string
  /**
   * Label text
   */
  label?: string
  /**
   * Stack the checkbox (label above input)
   */
  stacked?: boolean
  /**
   * Stack the checkbox on small screens and unstack on larger
   */
  stackedForSmall?: boolean
  /**
   * Stack the checkbox on medium screens and unstack on larger
   */
  stackedForMedium?: boolean
}

/**
 * Checkbox component for forms
 */
const Checkbox: React.FC<CheckboxProps> & {
  Fieldset: typeof CheckboxFieldset
} = ({
  error,
  className,
  label,
  ...props
}) => {
  // Start building the className
  const boolClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (props[name as keyof typeof props]) {
      boolClassNames.push(...BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete props[name as keyof typeof props]
  })

  const labelClassName = classNames(
    className,
    'rev-Checkbox',
    boolClassNames,
    {
      'is-invalid': !!error,
    }
  )

  const inputClassName = classNames('rev-Checkbox-input', {
    'is-invalid-input': !!error,
    'is-invalid': !!error,
  })

  return (
    <InputLabel className={labelClassName} error={error}>
      <input {...props} className={inputClassName} type="checkbox" />
      <span className="rev-Checkbox-label">{label}</span>
    </InputLabel>
  )
}

interface CheckboxOption {
  /**
   * Label text for the option
   */
  label: string
  /**
   * Value of the option
   */
  value: string
  /**
   * Optional key for React rendering
   */
  key?: string
  /**
   * Whether the option is disabled
   */
  disabled?: boolean
  /**
   * Default value for uncontrolled component
   */
  defaultValue?: string
}

export interface CheckboxFieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  /**
   * Array of checkbox options
   */
  options: CheckboxOption[]
  /**
   * Name for all checkboxes in the fieldset
   */
  name?: string
  /**
   * Selected values (for controlled component)
   */
  value?: string[]
  /**
   * Default selected values (for uncontrolled component)
   */
  defaultValue?: string[]
  /**
   * Fieldset label
   */
  label?: string
  /**
   * Help text
   */
  help?: string
  /**
   * Error message or boolean to indicate error state
   */
  error?: boolean | string
  /**
   * Change handler
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  /**
   * Whether the fieldset is read-only
   */
  readOnly?: boolean
}

/**
 * Fieldset component for grouping checkboxes
 */
class CheckboxFieldset extends React.Component<CheckboxFieldsetProps> {
  render() {
    const {
      className,
      options,
      name,
      value,
      defaultValue,
      label,
      help,
      error,
      onChange,
      readOnly,
      ...rest
    } = this.props

    const isControlled = !!value
    const hasDefault = !!defaultValue

    const valueArray = value || []
    const defaultValueArray = defaultValue || []

    const valueLookup: Record<string, boolean> = {}
    const defaultValueLookup: Record<string, boolean> = {}

    valueArray.forEach((val) => (valueLookup[val] = true))
    defaultValueArray.forEach((val) => (defaultValueLookup[val] = true))
    
    const checkboxes = options.map((option) => {
      const props: any = {
        name,
        error,
        onChange,
        readOnly,
        label: option.label,
        disabled: option.disabled,
      }

      if (isControlled) {
        props.value = option.value
        props.checked = !!valueLookup[option.value]
      }
      if (hasDefault) {
        props.defaultValue = option.defaultValue
        props.defaultChecked = !!defaultValueLookup[option.value]
      }
      return (
        <Checkbox
          key={option.key || option.value}
          className="rev-CheckboxFieldset-checkbox"
          {...props}
        />
      )
    })

    const fieldsetClassName = classNames(className, 'rev-CheckboxFieldset')

    return (
      <CheckableFieldset
        {...rest}
        className={fieldsetClassName}
        help={help}
        error={error}
        label={label}
      >
        {checkboxes}
      </CheckableFieldset>
    )
  }
}

Checkbox.Fieldset = CheckboxFieldset

export default Checkbox 