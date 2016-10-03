import React, {Component} from 'react'

import AuthenticityToken from './AuthenticityToken'
import MethodOverride from './MethodOverride'
import classNames from 'classnames'

export default class Form extends Component {

  static defaultProps = {
    method: 'GET',
  }

  get className() {
    return classNames(this.props.className, {
      'RevForm': true,
    })
  }

  get method() {
    return this.props.method.toUpperCase()
  }

  get supportedMethod() {
    return this.method === 'GET' ? 'GET' : 'POST'
  }

  render() {
    return (
      <form
        {...this.props}
        className={this.className}
        method={this.supportedMethod}>
        <AuthenticityToken />
        <MethodOverride method={this.method} />
        {this.props.children}
      </form>
    )
  }
}
