import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Table extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <div {...props} className={`rev-Table ${className}`}>
        {children}
      </div>
    )
  }
}
