import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class AuthenticityToken extends Component {

  static contextTypes = {
    'authenticityTokenValue': PropTypes.string,
    'authenticityTokenName': PropTypes.string,
  }

  render() {
    const {authenticityTokenName, authenticityTokenValue} = this.context

    // If a name has not been provided, just don't render.
    if(!authenticityTokenName) {
      return null
    }

    return (
      <input
        type="hidden"
        name={authenticityTokenName}
        value={authenticityTokenValue}
      />
    )
  }
}
