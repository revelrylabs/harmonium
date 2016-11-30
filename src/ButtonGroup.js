import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  tiny: ['tiny', 'rev-ButtonGroup--tiny'],
  small: ['small', 'rev-ButtonGroup--small'],
  large: ['large', 'rev-ButtonGroup--large'],

  secondary: ['secondary', 'rev-ButtonGroup--secondary'],
  success: ['success', 'rev-ButtonGroup--success'],
  warning: ['warning', 'rev-ButtonGroup--warning'],
  alert: ['alert', 'rev-ButtonGroup--alert'],

  hollow: ['hollow', 'rev-ButtonGroup--hollow'],

  expanded: ['expanded', 'rev-ButtonGroup--expanded'],

  stackedForSmall: ['stacked-for-small', 'rev-ButtonGroup--stackedForSmall'],
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

    const divClassName = classNames(className, 'button-group', 'rev-ButtonGroup', boolClassNames)

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
