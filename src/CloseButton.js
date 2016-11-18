import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

const PROP_TYPES = {
  children: PropTypes.node,
}

export default class CloseButton extends Component {
  static propTypes = PROP_TYPES

  render() {
    const {className, ...props} = this.props
    const classNamesList = classNames('close-button', className)

    return <button type="button" {...props} className={classNamesList}>
      {this.props.children}
    </button>
  }
}
