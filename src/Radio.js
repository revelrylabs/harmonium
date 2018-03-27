import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import CheckableFieldset from './CheckableFieldset'

export default class Radio extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
  }

  render() {
    const {error, className, label, ...props} = this.props

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
  static propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    label: PropTypes.string,
    help: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
  }

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

    const isControlled = value !== null
    const hasDefault = defaultValue !== null

    const radios = options.map((option) => {
      const props = {
        name,
        error,
        onChange,
        readOnly,
        label: option.label,
        disabled: option.disabled,
      }

      props.value = option.value

      if (isControlled) {
        props.checked = value === option.value
      }
      if (hasDefault) {
        props.defaultChecked = defaultValue === option.value
      }

      return (
        <Radio key={option.key || option.value} className="rev-RadioFieldset-radio" {...props} />
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
}

Radio.Fieldset = RadioFieldset
