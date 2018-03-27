import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  small: ['rev-Card--small'],
  large: ['rev-Card--large'],
  primary: ['rev-Card--primary'],
  secondary: ['rev-Card--secondary'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class CardLayout extends Component {
  render() {
    const {className, children, ...props} = this.props

    // Start building the className
    const boolClassNames = []

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })

    const divClassName = classNames(className, 'rev-CardLayout', boolClassNames)

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}

export class CardLayoutBar extends Component {
  render() {
    const {className, children, ...props} = this.props
    const divClassName = classNames(className, 'rev-CardLayout-bar')

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
CardLayout.Bar = CardLayoutBar

export class CardLayoutFill extends Component {
  render() {
    const {className, children, ...props} = this.props
    const divClassName = classNames(className, 'rev-CardLayout-fill')

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
CardLayout.Fill = CardLayoutFill
