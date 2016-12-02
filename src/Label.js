import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Icon from './Icon'

const CLASS_NAMES = {
  secondary: ['secondary', 'rev-Label--secondary'],
  alert: ['alert', 'rev-Label--alert'],
  warning: ['warning', 'rev-Label--warning'],
  success: ['success', 'rev-Label--success'],
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
    const {icon, children, ...props} = this.props
    return <span {...props} className={this.className}>
      {icon ? <Icon i={icon} className="rev-Label-icon" /> : null} {this.props.children}
    </span>
  }
}
