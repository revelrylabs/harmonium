import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

const CLASS_NAMES = {
  primary: ['primary', 'rev-Label--primary'],
  secondary: ['secondary', 'rev-Label--secondary'],
  tertiary: ['tertiary', 'rev-Label--tertiary'],

  alert: ['alert', 'rev-Label--alert'],
  warning: ['warning', 'rev-Label--warning'],
  success: ['success', 'rev-Label--success'],
  info: ['info', 'rev-Label--info'],
  tiny: ['tiny', 'rev-Label--tiny'],

  small: ['small', 'rev-Label--small'],
  medium: ['medium', 'rev-Label--medium'],
  large: ['large', 'rev-Label--large'],
}

const PROP_TYPES = {
  children: PropTypes.node,
}
Object.keys(CLASS_NAMES).forEach(key => PROP_TYPES[key] = PropTypes.bool)

export default class Label extends Component {
  static propTypes = PROP_TYPES

  get className() {
    const classNameList = []
    Object.keys(this.props).forEach(propName => {
      const className = CLASS_NAMES[propName]
      if (className) {
        classNameList.push(className)
      }
    })

    return classNames(classNameList, 'label', 'rev-Label', this.props.className)
  }

  render() {
    return <span className={this.className}>
      {this.props.children}
    </span>
  }
}
