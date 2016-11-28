import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  right: 'align-right',
  left: 'align-left',
  center: 'align-center',
  expanded: 'expanded',
  vertical: 'vertical',
  simple: 'simple',
  nested: 'nested',
  iconTop: 'icon-top',
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
    const newClassName = classNames('menu', boolClassNames)

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

    const newClassName = classNames({
      'menu-text': text,
      'active': active,
    })

    return (
      <li {...props} className={newClassName}>
        {children}
      </li>
    )
  }
}

Menu.Item = MenuItem
