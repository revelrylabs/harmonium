import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  stackedForMedium: 'stacked-for-medium',
  stackedForLarge: 'stacked-for-large',
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class TopBar extends Component {
  render() {
    const {className, children, ...props} = this.props
    const propClassNames = []
    BOOL_PROPS.forEach((name) => {
      if(props[name]) {
        propClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })
    const newClassName = classNames(className, 'top-bar', 'rev-TopBar', propClassNames)
    return (
      <div {...props} className={newClassName}>
        {children}
      </div>
    )
  }
}

class TopBarLeft extends Component {
  render() {
    const {className, children, ...props} = this.props
    const newClassName = classNames(className, 'top-bar-left', 'rev-TopBar-left')
    return (
      <div {...props} className={newClassName}>
        {children}
      </div>
    )
  }
}
TopBar.Left = TopBarLeft

class TopBarRight extends Component {
  render() {
    const {className, children, ...props} = this.props
    const newClassName = classNames(className, 'top-bar-right', 'rev-TopBar-right')
    return (
      <div {...props} className={newClassName}>
        {children}
      </div>
    )
  }
}
TopBar.Right = TopBarRight

class TopBarTitle extends Component {
  render() {
    const {className, children, ...props} = this.props
    const newClassName = classNames(className, 'top-bar-title', 'rev-TopBar-title')
    return (
      <div className={newClassName}>
        {children}
      </div>
    )
  }
}
TopBar.Title = TopBarTitle
