import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'
import CheckableFieldset from './CheckableFieldset'

export default class Checkbox extends Component {

  render() {
    const {error, className, label, children, ...props} = this.props

    const inputClassName = classNames({
      'is-invalid-input': !!error,
    })

    return (
      <InputLabel className={className} error={error}>
        <input {...props} className={inputClassName} type="checkbox" />
        {label}
      </InputLabel>
    )
  }
}

class CheckboxFieldset extends Component {
  render() {
    const {
      options,
      name,
      value,
      defaultValue,
      label,
      help,
      error,
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
        label: option.label,
        key: option.key || option.value,
      }
      if(isControlled) {
        props.value = option.value
        props.checked = !!valueLookup[option.value]
      }
      if(hasDefault) {
        props.defaultValue = option.value
        props.defaultChecked = !!defaultValueLookup[option.value]
      }
      return <Checkbox {...props} />
    })

    return (
      <CheckableFieldset help={help} error={error} label={label} {...rest}>
        {checkboxes}
      </CheckableFieldset>
    )
  }
}

Checkbox.Fieldset = CheckboxFieldset
