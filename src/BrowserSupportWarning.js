import React, {Component} from 'react'
import bowser from 'bowser'
import classNames from 'classnames'

export default class BrowserSupportWarning extends Component {
  render() {
    const {minVersions, className, children} = this.props
    const userAgent = this.props.userAgent || (typeof(window) !== 'undefined' && window.navigator.userAgent) || null
    const isSupported = userAgent ? bowser.check(this.props.minVersions, this.userAgent) : true
    if(isSupported) {
      return null
    }
    const divClassName = classNames(className, 'rev-BrowserSupportWarning')
    return <div className={divClassName}>{this.props.children}</div>
  }
}
