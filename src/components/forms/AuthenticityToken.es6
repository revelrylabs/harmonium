import React, {Component, PropTypes} from 'react'

export default class AuthenticityToken extends Component {

  static contextTypes = {
    'authenticityTokenValue': PropTypes.string,
    'authenticityTokenName': PropTypes.string,
  }

  render() {
    return (
      <input
        type="hidden"
        name={this.context.authenticityTokenName}
        value={this.context.authenticityTokenValue}
      />
    )
  }
}
