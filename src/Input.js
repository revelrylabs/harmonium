import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {uniqueId} from 'lodash'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class Input extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    inputRef: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    type: 'text',
  }

  render() {
    const {id, className, error, inputRef, ...props} = this.props
    const inputClassName = classNames(className, 'rev-Input', {
      'is-invalid-input': !!error,
      'is-invalid': !!error,
    })
    const inputProps = {
      ...props,
      className: inputClassName,
      ref: inputRef,
    }

    return <input id={id} {...inputProps} />
  }
}

class InputStack extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    help: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
  }

  render() {
    const {error, help, className, label, ...props} = this.props
    const labelClassName = classNames(className, 'rev-InputStack')
    const inputId = uniqueId('Input:')

    return (
      <InputLabel className={labelClassName} error={error} inputId={inputId}>
        {label}
        <Input {...props} error={error} id={inputId} />
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
      </InputLabel>
    )
  }
}
Input.Stack = InputStack
