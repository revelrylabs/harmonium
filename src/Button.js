import React, {Component, Children, createElement} from 'react'
import classNames from 'classnames'
import Icon from './Icon'

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
    // Extract props that will not pass through.
    const {className, children, tag, icon, ...props} = this.props

    // Start building the className
    const boolClassNames = []
    BOOL_PROPS.forEach((name) => {
      if(props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name] )
      }
      delete props[name]
    })

    // Of the props that WILL pass through, we need to use these.
    const {disabled, href} = props

    // Finish building the classNAme
    const buttonClassName = classNames(className, 'button', 'rev-Button', boolClassNames, {
      disabled,
    })

    // Modify underlying tag to suit props.
    const component = tag || (href ? 'a' : 'button')

    // Prepend icon if available
    let newChildren = children
    if(icon) {
      newChildren = [
        <Icon className="rev-Button-icon" key="icon" i={icon} />,
        ' ',
        ...Children.toArray(children),
      ]
    }

    // Finish
    return createElement(
      component,
      {...props, className: buttonClassName},
      newChildren,
    )
  }
}
