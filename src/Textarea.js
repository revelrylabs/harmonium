import React, {Component, PropTypes, Children, cloneElement} from 'react'
import InputLabel from './InputLabel'
import classNames from 'classnames'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class Textarea extends Component {

  static defaultProps = {
    type: 'text',
  }

  render() {
    const {className, error, ...props} = this.props
    const inputClassName = classNames(className, 'rev-Textarea', {
      'is-invalid-input': !!error,
      'is-invalid': !!error,
    })
    return (
      <textarea className={inputClassName} {...props} />
    )
  }
}

class TextareaStack extends Component {
  render() {
    const {error, help, className, label, ...props} = this.props

    const labelClassName = classNames(className, 'rev-TextareaStack')

    return (
      <InputLabel className={labelClassName} error={error}>
        {label}
        <Textarea {...props} error={error} />
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
      </InputLabel>
    )
  }
}
Textarea.Stack = TextareaStack
