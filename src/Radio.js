import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'
import CheckableFieldset from './CheckableFieldset'

export default class Radio extends Component {

  render() {
    const {error, className, label, children, ...props} = this.props

    const labelClassName = classNames(className, 'rev-Radio', {
      'is-invalid': !!error,
    })

    const inputClassName = classNames('rev-Radio-input', {
      'is-invalid-input': !!error,
      'is-invalid': !!error,
    })

    return (
      <InputLabel className={labelClassName} error={error}>
        <input {...props} className={inputClassName} type="radio" />
        <span className="rev-Radio-label">{label}</span>
      </InputLabel>
    )
  }
}

class RadioFieldset extends Component {
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

    const radios = options.map((option) => {
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
        props.checked = value == option.value
      }
      if(hasDefault) {
        props.defaultValue = option.value
        props.defaultChecked = defaultValue == option.value
      }
      return <Radio {...props} className="rev-RadioFieldset-radio" />
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
}

Radio.Fieldset = RadioFieldset
