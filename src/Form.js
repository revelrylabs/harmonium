import React, {Component} from 'react'

import AuthenticityToken from './AuthenticityToken'
import classNames from 'classnames'

export default class Form extends Component {
  render() {
    const {className, children, ...props} = this.props
    const formClassName = classNames(className, 'RevForm')

    return (
      <form {...props} className={formClassName}>
        <AuthenticityToken />
        {this.props.children}
      </form>
    )
  }
}
