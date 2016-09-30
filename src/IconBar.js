import React from 'react'
import classNames from 'classnames'

const REV_ICON_BAR_SIZES = ['one', 'two', 'three', 'four', 'five', 'six']

export default class IconBar extends React.Component {
  render() {
    const classes = {
      'icon-bar': true,
      'RevIconBar': true,
      'vertical': this.props.vertical,
    }

    for(let i = 0; i < REV_ICON_BAR_SIZES.length; i++) {
      const size = REV_ICON_BAR_SIZES[i]

      if(this.props[size]) {
        classes[`${size}-up`] = true
        break
      }
    }

    return <div className={classNames(this.props.className, classes)}>{this.props.children}</div>
  }
}
