import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  absolute: 'rev-CloseButton--absolute',
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class CloseButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props
    const propClassNames = []

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        propClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })

    const newClassName = classNames(className, 'rev-CloseButton', propClassNames)

    return (
      <button type="button" {...props} className={newClassName}>
        {this.props.children}
      </button>
    )
  }
}
