import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  right: ['align-right', 'rev-Menu--right'],
  left: ['align-left', 'rev-Menu--left'],
  center: ['align-center', 'rev-Menu--center'],
  expanded: ['expanded', 'rev-Menu--expanded'],
  vertical: ['vertical', 'rev-Menu--vertical'],
  simple: ['simple', 'rev-Menu--simple'],
  nested: ['nested', 'rev-Menu--nested'],
  iconTop: ['icon-top', 'rev-Menu--iconTop'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class Menu extends Component {
  render() {
    const {children, className, ...props} = this.props

    const boolClassNames = []
    BOOL_PROPS.forEach((name) => {
      if(props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })
    const newClassName = classNames(className, 'menu', 'rev-Menu', boolClassNames)

    return (
      <ul {...props} className={newClassName}>
        {children}
      </ul>
    )
  }
}

export class MenuItem extends Component {
  render() {
    const {children, className, text, active, ...props} = this.props

    const newClassName = classNames(className, 'rev-Menu-item', {
      'menu-text': text,
      'rev-Menu-item--text': text,
      'active': active,
      'is-active': active,
    })

    return (
      <li {...props} className={newClassName}>
        {children}
      </li>
    )
  }
}

Menu.Item = MenuItem
