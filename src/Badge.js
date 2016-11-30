import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

const PROP_NAME_TO_CLASS_NAME = {
  primary: 'primary',
  secondary: 'secondary',
  alert: 'alert',
  warning: 'warning',
  success: 'success',
  small: 'small',
  medium: 'medium',
  large: 'large',
}
const PROP_NAMES = Object.keys(PROP_NAME_TO_CLASS_NAME)
const PROP_TYPES = {}

PROP_NAMES.forEach((key) => PROP_TYPES[key] = PropTypes.bool)

export default class Badge extends Component {

  static propTypes = PROP_TYPES;

  render() {
    const {className, children, ...props} = this.props

    const propClassNames = []
    PROP_NAMES.forEach((name) => {
      if(props[name]) {
        propClassNames.push(PROP_NAME_TO_CLASS_NAME[name])
        delete props[name]
      }
    })

    const newClassName = classNames(className, 'badge', ...propClassNames)

    return (
      <span {...props} className={newClassName}>
        {children}
      </span>
    )
  }
}
