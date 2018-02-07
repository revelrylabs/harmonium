import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  fixed: 'rev-TopBar--fixed',
  center: 'rev-TopBar--center',
  left: 'rev-TopBar--left',
  justified: 'rev-TopBar--justified',
  right: 'rev-TopBar--right',
  breakpointMedium: 'rev-TopBar-breakpoint--mediumDown',
  breakpointLarge: 'rev-TopBar-breakpoint--largeDown',
  breakpointXlarge: 'rev-TopBar-breakpoint--xlargeDown',
  breakpointXxlarge: 'rev-TopBar-breakpoint--xxlargeDown',
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
        <nav role="navigation">
          {children}
        </nav>
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
