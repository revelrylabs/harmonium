import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'
import CheckableFieldset from './CheckableFieldset'

export default class Radio extends Component {

  render() {
    const {error, className, label, children, ...props} = this.props

    const inputClassName = classNames({
      'is-invalid-input': !!error,
    })

    return (
      <InputLabel className={className} error={error}>
        <input {...props} className={inputClassName} type="radio" />
        {label}
      </InputLabel>
    )
  }
}

class RadioFieldset extends Component {
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

    const radios = options.map((option) => {
      const props = {
        name,
        error,
        label: option.label,
        key: option.key || option.value,
      }
      if(isControlled) {
        props.value = option.value
        props.checked = value == option.value
      }
      if(hasDefault) {
        props.defaultValue = option.value
        props.defaultChecked = defaultValue == option.value
      }
      return <Radio {...props} />
    })

    return (
      <CheckableFieldset help={help} error={error} label={label} {...rest}>
        {radios}
      </CheckableFieldset>
    )
  }
}

Radio.Fieldset = RadioFieldset
