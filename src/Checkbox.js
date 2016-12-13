import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'
import CheckableFieldset from './CheckableFieldset'

export default class Checkbox extends Component {

  render() {
    const {error, className, label, children, ...props} = this.props

    const labelClassName = classNames(className, 'rev-Checkbox', {
      'is-invalid': !!error,
    })

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
}

class CheckboxFieldset extends Component {
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
      ...rest,
    } = this.props

    const isControlled = value != null
    const hasDefault = defaultValue != null

    const valueArray = value || []
    const defaultValueArray = defaultValue || []

    const valueLookup = {}
    const defaultValueLookup = {}

    valueArray.forEach((val) => valueLookup[val] = true)
    defaultValueArray.forEach((val) => defaultValueLookup[val] = true)

    const checkboxes = options.map((option) => {
      const props = {
        name,
        error,
        onChange,
        readOnly,
        label: option.label,
        key: option.key || option.value,
        disabled: option.disabled,
      }
      if(isControlled) {
        props.value = option.value
        props.checked = !!valueLookup[option.value]
      }
      if(hasDefault) {
        props.defaultValue = option.value
        props.defaultChecked = !!defaultValueLookup[option.value]
      }
      return <Checkbox className="rev-CheckboxFieldset-checkbox" {...props} />
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
