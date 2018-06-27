import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  center: 'Breadcrumbs--center',
  justified: 'Breadcrumbs--justified',
  right: 'Breadcrumbs--right',
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class Breadcrumbs extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const { className, children, ...props } = this.props
    const propClassNames = []

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        propClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })
    const newClassName = classNames(className, 'Breadcrumbs', propClassNames)

    return (
      <ul {...props} className={newClassName}>
        {children}
      </ul>
    )
  }
}

export class BreadcrumbsItem extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const { className, children, selected, disabled, ...props } = this.props

    const newClassName = classNames(`Breadcrumbs-item ${className || ''}`, {
      'Breadcrumbs-item--selected': selected,
      'Breadcrumbs-item--disabled': disabled,
    })
    
    return (
      <li {...props} className={newClassName}>
        {children}
      </li>
    )
  }
}
Breadcrumbs.Item = BreadcrumbsItem
