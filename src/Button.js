import React, {Component, createElement} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  tiny: ['tiny', 'rev-Button--tiny'],
  small: ['small', 'rev-Button--small'],
  large: ['large', 'rev-Button--large'],

  secondary: ['secondary', 'rev-Button--secondary'],
  success: ['success', 'rev-Button--success'],
  warning: ['warning', 'rev-Button--warning'],
  alert: ['alert', 'rev-Button--alert'],

  hollow: ['hollow', 'rev-Button--hollow'],

  expanded: ['expanded', 'rev-Button--expanded'],

  dropdown: ['dropdown', 'rev-Button--dropdown'],
  arrowOnly: ['arrow-only', 'rev-Button--arrowOnly'],
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

    const buttonClassName = classNames(className, 'button', 'rev-Button', boolClassNames, {
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
