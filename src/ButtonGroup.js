import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  small: ['rev-ButtonGroup--small'],
  large: ['rev-ButtonGroup--large'],

  primary: ['rev-ButtonGroup--primary'],
  secondary: ['rev-ButtonGroup--secondary'],
  inverted: ['rev-ButtonGroup--inverted'],

  success: ['rev-ButtonGroup--success'],
  warning: ['rev-ButtonGroup--warning'],
  alert: ['rev-ButtonGroup--alert'],
  disabled: ['rev-Button--disabled'],

  expanded: ['rev-ButtonGroup--expanded'],

  stackedForSmall: ['rev-ButtonGroup--stackedForSmall'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class ButtonGroup extends React.Component {
  render() {
    const {className, children, ...props} = this.props

    const boolClassNames = []
    BOOL_PROPS.forEach((name) => {
      if(props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name] )
      }
      delete props[name]
    })

    const divClassName = classNames(className, 'rev-ButtonGroup', boolClassNames)

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
