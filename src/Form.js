import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AuthenticityToken from './AuthenticityToken'
import classNames from 'classnames'

export default class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    enableMethodOverride: PropTypes.bool,
    methodOverrideInputName: PropTypes.string,
    method: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    enableMethodOverride: true,
    methodOverrideInputName: '_method',
    method: 'post',
  }

  render() {
    const {
      className,
      children,
      enableMethodOverride,
      methodOverrideInputName,
      method,
      ...props
    } = this.props

    const formClassName = classNames(className, 'rev-Form')

    const overrideMethod = // only override the method name if its enabled and the method is not post or get.
      enableMethodOverride && !['get', 'post'].includes(method.toLowerCase())

    const actualMethod = overrideMethod ? 'post' : method

    return (
      <form {...props} className={formClassName} method={actualMethod}>
        <AuthenticityToken />
        {overrideMethod && <input type="hidden" name={methodOverrideInputName} value={method} />}
        {children}
      </form>
    )
  }
}
