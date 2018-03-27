import React, {Component} from 'react'
import classNames from 'classnames'

export default class Icon extends Component {
  render() {
    const {className, i, icon, ...props} = this.props

    if (icon) {
      console.warn(
        'The `icon` property has been deprecated and will be removed in a future version. Please use <Icon i="icon-name" /> instead.'
      )
    }
    const iconName = i || icon

    const newClassName = classNames(
      className,
      `fi-${iconName}`,
      'rev-Icon',
      `rev-Icon--${iconName}`
    )

    return <i {...props} className={newClassName} />
  }
}
