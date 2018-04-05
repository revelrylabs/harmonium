import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputLabel from './InputLabel'
import classNames from 'classnames'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class Textarea extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    className: PropTypes.string,
  }

  static defaultProps = {
    type: 'text',
  }

  render() {
    const {className, error, ...props} = this.props
    const inputClassName = classNames(className, 'rev-Textarea', {
      'is-invalid-input': !!error,
      'is-invalid': !!error,
    })

    return <textarea className={inputClassName} {...props} />
  }
}

class TextareaStack extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    help: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
  }

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
