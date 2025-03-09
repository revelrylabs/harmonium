import React from 'react'
import bowser from 'bowser'
import classNames from 'classnames'

export interface BrowserSupportWarningProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom user agent string to use for browser detection
   */
  userAgent?: string
  /**
   * Minimum browser versions to support
   */
  minVersions: Record<string, number>
}

/**
 * A component that displays a warning if the user's browser doesn't meet minimum version requirements
 */
const BrowserSupportWarning: React.FC<BrowserSupportWarningProps> = ({
  userAgent,
  minVersions,
  className,
  children,
  ...props
}) => {
  const checkIsSupported = (): boolean => {
    const currentUserAgent =
      userAgent ||
      (typeof window !== 'undefined' && window.navigator.userAgent) ||
      null

    return currentUserAgent ? bowser.check(minVersions, currentUserAgent) : true
  }

  const divClassName = classNames(className, 'rev-BrowserSupportWarning')
  const isSupported = checkIsSupported()

  if (isSupported === null || isSupported) {
    return null
  }
  
  return <div className={divClassName} {...props}>{children}</div>
}

export default BrowserSupportWarning 