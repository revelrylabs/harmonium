import React, {Component} from 'react'
import bowser from 'bowser'
import classNames from 'classnames'

export default class BrowserSupportWarning extends Component {

  state = {isSupported: null}

  componentDidMount() {
    const {minVersions} = this.props
    const userAgent = this.props.userAgent || (typeof(window) !== 'undefined' && window.navigator.userAgent) || null
    const isSupported = userAgent ? bowser.check(this.props.minVersions, this.userAgent) : true
    this.setState({isSupported})
  }

  render() {
    const {isSupported} = this.state
    if(isSupported === null || isSupported) {
      return null
    }
    const {className, children} = this.props
    const divClassName = classNames(className, 'rev-BrowserSupportWarning')
    return <div className={divClassName}>{children}</div>
  }
}
