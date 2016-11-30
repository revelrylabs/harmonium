import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  tiny: 'tiny',
  small: 'small',
  large: 'large',

  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  alert: 'alert',

  hollow: 'hollow',

  expanded: 'expanded',

  stackedForSmall: 'stacked-for-small',
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

    const divClassName = classNames(className, 'button-group', boolClassNames)

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
