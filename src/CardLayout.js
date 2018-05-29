import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  small: ['rev-Card--small'],
  large: ['rev-Card--large'],
  primary: ['rev-Card--primary'],
  secondary: ['rev-Card--secondary'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class CardLayout extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    getCalendarRef: PropTypes.func,
  }

  render() {
    const {className, children, getCalendarRef, ...props} = this.props

    // Start building the className
    const boolClassNames = []

    if (getCalendarRef && this.calendar) {
      getCalendarRef(this.calendar)
    }

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })

    const divClassName = classNames(className, 'rev-CardLayout', boolClassNames)

    return (
      <div
        {...props}
        className={divClassName}
        ref={(self) => (this.calendar = self)}
      >
        {children}
      </div>
    )
  }
}

export class CardLayoutBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

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
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

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
