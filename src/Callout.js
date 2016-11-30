import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  secondary: ['secondary', 'rev-Callout--secondary'],
  primary: ['primary', 'rev-Callout--primary'],
  success: ['success', 'rev-Callout--success'],
  warning: ['warning', 'rev-Callout--warning'],
  alert: ['alert', 'rev-Callout--alert'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class Callout extends React.Component {
  render() {
    const {className, children, ...props} = this.props

    const boolClassNames = []
    BOOL_PROPS.forEach((name) => {
      if(props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })

    const divClassName = classNames(className, 'callout', 'rev-Callout', boolClassNames)

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
