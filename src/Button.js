import React, {Component} from 'react'
import classNames from 'classnames'

const CLASS_NAME_PROPS = [
  'tiny',
  'small',
  'medium',
  'large',
  'alert',
  'disabled',
  'secondary',
  'success',
  'expanded',
  'hollow',
  'dropdown',
]

const CLASS_NAME_PROP_SHOULD_PASS_THROUGH = {
  disabled: true,
}

export default class Button extends Component {
  render() {
    const {children, className, ...props} = this.props

    const classNamesFromProps = {}
    CLASS_NAME_PROPS.forEach((name) => {
      classNamesFromProps[name] = !!props[name]
      if(!CLASS_NAME_PROP_SHOULD_PASS_THROUGH[name]) {
        delete props[name]
      }
    })

    const buttonClassName = classNames(className, 'button', classNamesFromProps)

    return (
      <button {...props} className={buttonClassName}>
        {children}
      </button>
    )
  }
}
