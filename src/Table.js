import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TableLayout from './TableLayout'

export default class Table extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <TableLayout {...props} className={`rev-Table ${className}`}>
        {children}
      </TableLayout>
    )
  }
}

class TableBody extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children} = this.props

    return (
      <TableLayout.Bar className={`rev-Card-body ${className}`}>
        {children}
      </TableLayout.Bar>
    )
  }
}
Table.Body = TableBody
