import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

const PROP_TYPES = {
  children: PropTypes.node,
}

export default class CloseButton extends Component {
  static propTypes = PROP_TYPES

  render() {
    const className = classNames('close-button', this.props.className)

    return <button type="button" className={className}>
      {this.props.children}
    </button>
  }
}
