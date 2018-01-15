import React, {Component} from 'react'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class CheckableFieldset extends Component {
  render() {
    const {label, className, children, help, error, name, value, defaultValue, options, ...props} = this.props

    const fieldsetClassName = classNames(className, 'fieldset', 'rev-CheckableFieldset', {'is-invalid-fieldset': !!error})

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
