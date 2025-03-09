import React, { Component, ReactNode } from 'react'
import classNames from 'classnames'

export interface FlexVideoProps {
  widescreen?: string
  vimeo?: string
  className?: string
  children?: ReactNode
  [key: string]: any
}

export default class FlexVideo extends Component<FlexVideoProps> {
  render() {
    const { className, children, widescreen, vimeo, ...props } = this.props

    const divClassName = classNames(className, 'flex-video', 'rev-FlexVideo', {
      widescreen,
      vimeo,
    })

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
} 