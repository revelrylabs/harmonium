import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Icon from './Icon'

const PROP_NAME_TO_CLASS_NAME = {
  secondary: ['secondary', 'rev-Label--secondary'],
  alert: ['alert', 'rev-Label--alert'],
  warning: ['warning', 'rev-Label--warning'],
  success: ['success', 'rev-Label--success'],
}
const PROP_NAMES = Object.keys(PROP_NAME_TO_CLASS_NAME)
const PROP_TYPES = {
  icon: PropTypes.string,
}

PROP_NAMES.forEach((key) => PROP_TYPES[key] = PropTypes.bool)

export default class Label extends Component {

  static propTypes = PROP_TYPES;

  render() {
    const {className, children, icon, ...props} = this.props

    const propClassNames = []
    PROP_NAMES.forEach((name) => {
      if(props[name]) {
        propClassNames.push(PROP_NAME_TO_CLASS_NAME[name])
        delete props[name]
      }
    })

    const newClassName = classNames(className, 'label', 'rev-Label', propClassNames)

    return (
      <span {...props} className={newClassName}>
        {icon ? <Icon i={icon} className="rev-Label-icon" /> : null} {children}
      </span>
    )
  }
}
