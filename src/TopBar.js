import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  stackedForMedium: 'stacked-for-medium',
  stackedForLarge: 'stacked-for-large',
  stackedForLarge: 'stacked-for-large',
  center: 'rev-TopBar--center',
  left: 'rev-TopBar--left',
  justified: 'rev-TopBar--justified',
  right: 'rev-TopBar--right',
  inverse: 'rev-TopBar--inverse',
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
    const newClassName = classNames(className, 'rev-TopBar', propClassNames)
    return (
      <div {...props} className={newClassName}>
        {children}
      </div>
    )
  }
}

class TopBarItem extends Component {
  render() {
    const {className, children, ...props} = this.props
    const newClassName = classNames(className, 'rev-TopBar-item')
    return (
      <div {...props} className={newClassName}>
        {children}
      </div>
    )
  }
}
TopBar.Item = TopBarItem

class TopBarItemRight extends Component {
  render() {
    const {className, children, ...props} = this.props
    const newClassName = classNames(className, 'rev-TopBar-item--right')
    return (
      <div {...props} className={newClassName}>
        {children}
      </div>
    )
  }
}
TopBar.Item.Right = TopBarItemRight

class TopBarItemLeft extends Component {
  render() {
    const {className, children, ...props} = this.props
    const newClassName = classNames(className, 'rev-TopBar-item--left')
    return (
      <div className={newClassName}>
        {children}
      </div>
    )
  }
}
TopBar.Item.Left = TopBarItemLeft
