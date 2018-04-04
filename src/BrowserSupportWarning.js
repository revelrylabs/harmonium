import React, {Component} from 'react'
import PropTypes from 'prop-types'
import bowser from 'bowser'
import classNames from 'classnames'

export default class BrowserSupportWarning extends Component {
  static propTypes = {
    userAgent: PropTypes.any,
    minVersions: PropTypes.object.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  checkIsSupported = () => {
    const {minVersions} = this.props
    const userAgent =
      this.props.userAgent ||
      (typeof window !== 'undefined' && window.navigator.userAgent) ||
      null

    return userAgent ? bowser.check(minVersions, this.userAgent) : true
  }

  render() {
    const {className, children} = this.props
    const divClassName = classNames(className, 'rev-BrowserSupportWarning')
    const isSupported = this.checkIsSupported()

    if (isSupported === null || isSupported) {
      return null
    }
    return <div className={divClassName}>{children}</div>
  }
}
