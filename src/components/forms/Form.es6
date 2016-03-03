import React, {Component} from 'react'
import Revelry from '../../revelry'
import AuthenticityToken from './AuthenticityToken'
import MethodOverride from './MethodOverride'

export default Revelry.registerComponent('Form', class Form extends Component {

  static defaultProps = {
    method: 'GET',
  }

  get className() {
    return this.classAdd({
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
})
