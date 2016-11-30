import React, {Component, createElement} from 'react'
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

  dropdown: 'dropdown',
  arrowOnly: 'arrow-only',
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class Button extends Component {
  render() {
    const {className, children, ...props} = this.props

    const boolClassNames = []
    BOOL_PROPS.forEach((name) => {
      if(props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name] )
      }
      delete props[name]
    })

    const {disabled, href} = props

    const buttonClassName = classNames(className, 'button', boolClassNames, {
      disabled,
    })

    const component = href ? 'a' : 'button'

    return createElement(
      component,
      {...props, className: buttonClassName},
      children,
    )
  }
}
