import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  left: 'rev-TopBarDrawer--left',
  right: 'rev-TopBarDrawer--right',
  top: 'rev-TopBarDrawer--top',
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class TopBarDrawer extends Component {
  render() {
    const {className, children, ...props} = this.props
    const propClassNames = []
    BOOL_PROPS.forEach((name) => {
      if(props[name]) {
        propClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })
    const newClassName = classNames(className, 'rev-TopBarDrawer', propClassNames)
    return (
      <div {...props} className={newClassName}>
        {children}
      </div>
    )
  }
}
