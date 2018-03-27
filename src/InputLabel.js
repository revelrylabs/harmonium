import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class InputLabel extends Component {
  static propTypes = {
    error: PropTypes.string,
    inputId: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {error, className, children, inputId, ...props} = this.props

    const labelClassName = classNames(className, 'rev-InputLabel', {
      'is-invalid-label': !!error,
      'is-invalid': !!error,
    })

    return (
      <label htmlFor={inputId} className={labelClassName} {...props}>
        {children}
      </label>
    )
  }
}
