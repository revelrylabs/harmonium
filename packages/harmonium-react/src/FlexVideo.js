import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class FlexVideo extends Component {
  static propTypes = {
    widescreen: PropTypes.string,
    vimeo: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  }

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
