import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class Select extends Component {
  static propTypes = {
    options: PropTypes.node,
    error: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  }

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
  static propTypes = {
    label: PropTypes.string,
    help: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  }
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
