import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class InputLabel extends Component {

  render() {
    const {error, className, children, ...props} = this.props

    const labelClassName = classNames(className, 'rev-InputLabel', {
      'is-invalid-label': !!error,
      'is-invalid': !!error,
    })

    return (
      <label className={labelClassName} {...props}>
        {children}
      </label>
    )
  }
}
