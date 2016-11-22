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
    const {children, options, label, className, help, error, ...props} = this.props

    const inputClassName = classNames({
      'is-invalid-input': !!error,
    })

    return (
      <InputLabel className={className} error={error}>
        {label}
        <select className={inputClassName} {...props}>
          {children}
          {options ? Select.options(options) : null}
        </select>
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
      </InputLabel>
    )
  }
}
