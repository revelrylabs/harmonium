import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class CheckableFieldset extends Component {
  static propTypes = {
    label: PropTypes.string,
    help: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {label, className, children, help, error, ...props} = this.props

    const fieldsetClassName = classNames(className, 'fieldset', 'rev-CheckableFieldset', {
      'is-invalid-fieldset': !!error,
    })

    const legendClassName = classNames({
      'is-invalid-label': !!error,
    })

    return (
      <div>
        <fieldset {...props} className={fieldsetClassName}>
          {label ? <legend className={legendClassName}>{label}</legend> : null}
          {children}
          <InputHelpText>{help}</InputHelpText>
          <InputErrors>{error}</InputErrors>
        </fieldset>
      </div>
    )
  }
}
