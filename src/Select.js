import React, {Component, createElement} from 'react'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class Select extends Component {
  static options(options) {
    return options.map(({key, label, value, ...props}) => (
      <option key={key || value} value={value} {...props}>
        {label}
      </option>
    ))
  }

  render() {
    const {children, options, className, error, ...props} = this.props

    const inputClassName = classNames(className, 'rev-Select', {
      'is-invalid-input': !!error,
      'is-invalid': !!error,
    })

    return (
      <select className={inputClassName} {...props}>
        {children}
        {options ? Select.options(options) : null}
      </select>
    )
  }
}

class SelectStack extends Component {
  render() {
    const {children, label, className, help, error, ...props} = this.props

    const labelClassName = classNames(className, 'rev-SelectStack')

    return (
      <InputLabel className={labelClassName} error={error}>
        {label}
        <Select {...props} error={error}>
          {children}
        </Select>
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
      </InputLabel>
    )
  }
}
Select.Stack = SelectStack
