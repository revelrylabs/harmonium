import React, {Component, PropTypes} from 'react'
import InputLabel from './InputLabel'
import classNames from 'classnames'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class Input extends Component {

  static propTypes = {
    error: PropTypes.any,
    label: PropTypes.node,
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  };

  static defaultProps = {
    type: 'text',
  }

  render() {
    const {error, help, className, label, children, ...props} = this.props

    const inputClassName = classNames({
      'is-invalid-input': !!error,
    })

    return (
      <InputLabel className={className} error={error}>
        {label}
        <input className={inputClassName} {...props} />
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
      </InputLabel>
    )
  }
}
