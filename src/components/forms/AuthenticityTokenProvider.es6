import React, {Component, PropTypes} from 'react'

export default class AuthenticityTokenProvider extends Component {

  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }

  static childContextTypes = {
    authenticityTokenName: PropTypes.string,
    authenticityTokenValue: PropTypes.string,
  }

  getChildContext() {
    return {
      authenticityTokenName: this.props.name,
      authenticityTokenValue: this.props.value,
    }
  }

  render() {
    return this.props.children
  }

}
