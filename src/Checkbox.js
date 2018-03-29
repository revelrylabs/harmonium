import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import CheckableFieldset from './CheckableFieldset'

const BOOL_PROPS_TO_CLASS_NAMES = {
  stacked: ['rev-Checkbox--stacked'],
  stackedForSmall: ['rev-Checkbox--stackedForSmall'],
  stackedForMedium: ['rev-Checkbox--stackedForMedium'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class Checkbox extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    label: PropTypes.string,
    className: PropTypes.string,
  }

  render() {
    const {error, className, label, ...props} = this.props

    // Start building the className
    const boolClassNames = []

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
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
}

class CheckboxFieldset extends Component {
  static propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    label: PropTypes.string,
    help: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
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

    const isControlled = !!value
    const hasDefault = !!defaultValue

    const valueArray = value || []
    const defaultValueArray = defaultValue || []

    const valueLookup = {}
    const defaultValueLookup = {}

    valueArray.forEach((val) => (valueLookup[val] = true))
    defaultValueArray.forEach((val) => (defaultValueLookup[val] = true))

    const checkboxes = options.map((option) => {
      const props = {
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
        props.defaultChecked = !!defaultValueLookup[option.defaultValue]
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
