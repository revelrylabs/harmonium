import React, {Component, Children, createElement} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from './Icon'

const BOOL_PROPS_TO_CLASS_NAMES = {
  small: ['rev-Button--small'],
  large: ['rev-Button--large'],

  primary: ['rev-Button--primary'],
  secondary: ['rev-Button--secondary'],
  inverted: ['rev-Button--inverted'],

  success: ['rev-Button--success'],
  warning: ['rev-Button--warning'],
  alert: ['rev-Button--alert'],
  disabled: ['rev-Button--disabled'],

  expanded: ['rev-Button--expanded'],

  dropdown: ['rev-Button--dropdown'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class Button extends Component {
  static propTypes = {
    tag: PropTypes.string,
    icon: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  }
  /* eslint complexity: [2, 4] */
  render() {
    // Extract props that will not pass through.
    const {className, children, tag, icon, ...props} = this.props

    // Start building the className
    const boolClassNames = []

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })

    // Of the props that WILL pass through, we need to use these.
    const {disabled, href} = props

    // Finish building the classNAme
    const buttonClassName = classNames(
      className,
      'rev-Button',
      boolClassNames,
      {
        disabled,
      }
    )

    // Modify underlying tag to suit props.
    const component = tag || (href ? 'a' : 'button')

    // Prepend icon if available
    let newChildren = children

    if (icon) {
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
      newChildren
    )
  }
}
