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


class TableHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <div {...props} className={`rev-Table-header u-hide--mediumDown ${className}`}>
        {children}
      </div>
    )
  }
}
Table.Header = TableHeader


class TableBody extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children} = this.props

    return (
      <div className={`rev-Table-body ${className}`}>
        {children}
      </div>
    )
  }
}
Table.Body = TableBody


class TableRow extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children} = this.props

    return (
      <div className={`rev-Table-row rev-Row ${className}`}>
        {children}
      </div>
    )
  }
}
Table.Row = TableRow
