import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

const CLASS_NAMES = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',

  alert: 'alert',
  warning: 'warning',
  success: 'success',
  info: 'info',
  tiny: 'tiny',

  small: 'small',
  medium: 'medium',
  large: 'large',
}

const PROP_TYPES = {
  children: PropTypes.node,
}
Object.keys(CLASS_NAMES).forEach(key => PROP_TYPES[key] = PropTypes.bool)

export default class Label extends Component {
  static propTypes = PROP_TYPES

  get className() {
    const classNameList = ['label']
    Object.keys(this.props).forEach(propName => {
      const className = CLASS_NAMES[propName]
      if (className) {
        classNameList.push(className)
      }
    })

    return classNames(classNameList, this.props.className)
  }

  render() {
    return <span className={this.className}>
      {this.props.children}
    </span>
  }
}
