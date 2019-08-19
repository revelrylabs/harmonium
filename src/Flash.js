import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  success: ['rev-Flash--success'],
  warning: ['rev-Flash--warning'],
  alert: ['rev-Flash--alert'],
  persistent: ['rev-Flash--persistent'],
  fade: ['rev-Flash--fade'],
  dismissible: ['rev-Flash--dismissible'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class Flash extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    const boolClassNames = []

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })

    const divClassName = classNames(className, 'rev-Flash', boolClassNames)

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
