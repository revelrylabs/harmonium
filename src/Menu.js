import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  horizontal: ['rev-Menu--horizontalLeft'],
  horizontalLeft: ['rev-Menu--horizontalLeft'],
  horizontalCentered: ['rev-Menu--horizontalCentered'],
  horizontalJustified: ['rev-Menu--horizontalJustified'],
  horizontalRight: ['rev-Menu--horizontalRight'],

  vertical: ['rev-Menu--verticalLeft'],
  verticalLeft: ['rev-Menu--verticalLeft'],
  verticalCentered: ['rev-Menu--verticalCentered'],
  verticalRight: ['rev-Menu--verticalRight'],

  nested: ['rev-Menu--nested'],
  dividers: ['rev-Menu--dividers'],
  icons: ['rev-Menu--icons'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class Menu extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {children, className, ...props} = this.props

    const boolClassNames = []

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })
    const newClassName = classNames(className, 'rev-Menu', boolClassNames)

    return (
      <ul {...props} className={newClassName}>
        {children}
      </ul>
    )
  }
}

export class MenuItem extends Component {
  static propTypes = {
    text: PropTypes.string,
    divider: PropTypes.string,
    active: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {children, className, text, divider, active, ...props} = this.props

    const newClassName = classNames(`rev-Menu-item ${className || ''}`, {
      'rev-Menu-item--divider': divider,
      'rev-Menu-item--text': text,
      'rev-Menu-item--selected': active,
    })

    return (
      <li {...props} className={newClassName}>
        {children}
      </li>
    )
  }
}

Menu.Item = MenuItem
