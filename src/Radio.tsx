import React from 'react'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import CheckableFieldset from './CheckableFieldset'

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string
  label?: string
  className?: string
}

/**
 * Radio component for radio button inputs
 * @param props - Component props
 * @returns Radio component
 */
const Radio: React.FC<RadioProps> & {
  Fieldset: React.FC<RadioFieldsetProps>
} = (props) => {
  const { error, className, label, ...passthrough } = props

  const labelClassName = classNames(className, 'rev-Radio', {
    'is-invalid': !!error,
  })

  const inputClassName = classNames('rev-Radio-input', {
    'is-invalid-input': !!error,
    'is-invalid': !!error,
  })

  return (
    <InputLabel className={labelClassName} error={error}>
      <input {...passthrough} className={inputClassName} type="radio" />
      <span className="rev-Radio-label">{label}</span>
    </InputLabel>
  )
}

export interface RadioOption {
  label: string
  value: string
  key?: string
  disabled?: boolean
}

export interface RadioFieldsetProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  options: RadioOption[]
  name?: string
  value?: any
  defaultValue?: any
  label?: string
  help?: string
  error?: boolean | string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
  className?: string
}

/**
 * RadioFieldset component for groups of radio buttons
 * @param props - Component props
 * @returns RadioFieldset component
 */
const RadioFieldset: React.FC<RadioFieldsetProps> = (props) => {
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
  } = props

  const isControlled = value !== undefined
  const hasDefault = defaultValue !== undefined

  /* eslint complexity: [2, 4] */
  const radios = options.map((option) => {
    const radioProps: RadioProps & {
      checked?: boolean
      defaultChecked?: boolean
    } = {
      name,
      error,
      onChange,
      readOnly,
      label: option.label,
      disabled: option.disabled,
      value: option.value,
    }

    if (isControlled) {
      radioProps.checked = value === option.value
    }
    if (hasDefault) {
      radioProps.defaultChecked = defaultValue === option.value
    }

    return (
      <Radio
        key={option.key || option.value}
        className="rev-RadioFieldset-radio"
        {...radioProps}
      />
    )
  })

  const fieldsetClassName = classNames(className, 'rev-RadioFieldset')

  return (
    <CheckableFieldset
      {...rest}
      className={fieldsetClassName}
      help={help}
      error={error}
      label={label}
    >
      {radios}
    </CheckableFieldset>
  )
}

Radio.Fieldset = RadioFieldset

export { RadioFieldset }
export default Radio 