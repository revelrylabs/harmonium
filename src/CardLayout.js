import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class CardLayout extends Component {
  render() {
    const {className, children, ...props} = this.props
    const divClassName = classNames(className, 'CardLayout')
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
    const divClassName = classNames(className, 'CardLayout-Bar')
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
    const divClassName = classNames(className, 'CardLayout-Fill')
    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
CardLayout.Fill = CardLayoutFill
