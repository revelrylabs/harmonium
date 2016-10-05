import React, {Component} from 'react'
import bowser from 'bowser'

export default class BrowserSupportWarning extends Component {
  render() {
    const {minVersions, children} = this.props
    const userAgent = this.props.userAgent || (typeof(window) !== 'undefined' && window.navigator.userAgent) || null
    const isSupported = userAgent ? bowser.check(this.props.minVersions, this.userAgent) : true
    if(isSupported) {
      return null
    }
    return <div>{this.props.children}</div>
  }
}
