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
    const {className, i, adapter, ...props} = this.props
    const newClassName = classNames(className, adapter(i))

    return (
      <i {...props} className={newClassName} />
    )
  }
}

Icon.setDefaultAdapter(ADAPTERS.FOUNDATION)
