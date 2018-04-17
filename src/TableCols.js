import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class TableCols extends React.Component {
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


class TableColsHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <div {...props} className={`rev-Table-header Hide--mediumDown ${className}`}>
        {children}
      </div>
    )
  }
}
TableCols.Header = TableColsHeader


class TableColsHeaderSmall extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <div {...props} className={`rev-Table-header Hide--mediumUp ${className}`}>
        {children}
      </div>
    )
  }
}
TableCols.HeaderSmall = TableColsHeaderSmall


class TableColsBody extends Component {
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
TableCols.Body = TableColsBody


class TableColsRow extends Component {
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
TableCols.Row = TableColsRow
