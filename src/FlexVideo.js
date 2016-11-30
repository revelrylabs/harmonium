import React, {Component} from 'react'
import classNames from 'classnames'

export default class FlexVideo extends Component {
  render() {
    const {className, children, widescreen, vimeo, ...props} = this.props

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
