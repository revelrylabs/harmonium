import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

const CLASS_NAMES = {
  primary: 'primary',
  secondary: 'secondary',
  alert: 'alert',
  warning: 'warning',
  success: 'success',
  small: 'small',
  medium: 'medium',
  large: 'large',
}

const PROP_TYPES = {
  children: PropTypes.node,
  id: PropTypes.string,
}

Object.keys(CLASS_NAMES).forEach(key => PROP_TYPES[key] = PropTypes.bool)

export default class Badge extends Component {
  static propTypes = PROP_TYPES

  get id() {
    if (this.props.id)
    return this.props.id
  }

  get className() {
    const classNameList = ['badge']

    Object.keys(this.props).forEach(propName => {
      const className = CLASS_NAMES[propName]
      if (className) {
        classNameList.push(className)
      }
    })

    return classNames(classNameList)
  }

  render() {
    return(
      <div className={this.className} id={this.id}>
        {this.props.children}
      </div>
    )
  }
}
