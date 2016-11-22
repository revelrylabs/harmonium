import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class InputErrors extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const {children, className, ...props} = this.props

    if(!children) {
      return null
    }

    const newClassName = classNames(className, 'form-error', 'is-visible')

    return (
      <span className={newClassName} {...props}>{children}</span>
    )
  }
}
