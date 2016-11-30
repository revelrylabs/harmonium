import React, {Component} from 'react'
import classNames from 'classnames'

const ADAPTERS = {
  FONTAWESOME: (icon) => `fa fa-${icon}`,
  ICOMOON: (icon) => `icon-${icon}`,
  FOUNDATION: (icon) => `fi-${icon}`,
}

export default class Icon extends Component {

  static ADAPTERS = ADAPTERS;

  static defaultProps = {};

  static setDefaultAdapter(adapterFunction) {
    this.defaultProps.adapter = adapterFunction
  };

  render() {
    const {className, i, icon, adapter, ...props} = this.props

    if(icon) {
      console.warn('The `icon` property has been deprecated and will be removed in a future version. Please use <Icon i="icon-name" /> instead.')
    }
    const iconName = i || icon

    const newClassName = classNames(
      className,
      'rev-Icon',
      `rev-Icon--${iconName}`,
      adapter(iconName),
    )

    return (
      <i {...props} className={newClassName} />
    )
  }
}

Icon.setDefaultAdapter(ADAPTERS.FOUNDATION)
