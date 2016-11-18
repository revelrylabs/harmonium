import React, {Component, PropTypes} from 'react'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class Input extends Component {

  static propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errors: PropTypes.array,
    helpText: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    className: null,
    errors: [],
    required: false,
    type: 'text',
  }

  get inputProps() {
    const {
      defaultValue,
      id,
      name,
      onChange,
      placeholder,
      type,
      value,
    } = this.props

    return {name, id, value, defaultValue, type, placeholder, onChange}
  }

  render() {
    const {id, errors, helpText, className, required, label} = this.props

    return (
      <label className={labelClasses(errors, className)}>
        <span className="LabelText">{labelText(required, label)}</span>
        <input className={inputClasses(errors)} {...this.inputProps} />
        <InputHelpText>{helpText}</InputHelpText>
        <InputErrors errors={errors} />
      </label>
    )
  }
}

function labelClasses(errors, className) {
  let classes = []

  if (errors.length > 0) {
    classes.push('is-invalid-label')
  }
  if (className) {
    classes.push(className)
  }
  return classes.join(' ')
}

function labelText(required, label) {
  if (required) {
    return `${label} *`
  } else {
    return label
  }
}

function inputClasses(errors) {
  return errors.length > 0 ? 'is-invalid-input' : ''
}
