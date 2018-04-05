import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const PROP_TYPES = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default class CloseButton extends Component {
  static propTypes = PROP_TYPES

  render() {
    const {className, ...props} = this.props
    const classNamesList = classNames('rev-CloseButton', className)

    return (
      <button type="button" {...props} className={classNamesList}>
        {this.props.children}
      </button>
    )
  }
}
