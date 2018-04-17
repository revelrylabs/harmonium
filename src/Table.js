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
      <table {...props} className={`rev-Table ${className}`}>
        {children}
      </table>
    )
  }
}


class TableHead extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <thead {...props} className={`rev-Table-header Hide--mediumDown ${className}`}>
        {children}
      </thead>
    )
  }
}
Table.Head = TableHead

class TableHeadSmall extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <thead {...props} className={`rev-Table-head Hide--mediumUp ${className}`}>
        {children}
      </thead>
    )
  }
}
Table.HeadSmall = TableHeadSmall


class TableHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <th {...props} className={`rev-Table-head Hide--mediumDown ${className}`}>
        {children}
      </th>
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
      <tbody className={`rev-Table-body rev-Table--scroll rev-Table--striped ${className}`}>
        {children}
      </tbody>
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
      <tr className={`rev-Table-row rev-Row ${className}`}>
        {children}
      </tr>
    )
  }
}
Table.Row = TableRow


class TableData extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children} = this.props

    return (
      <td className={`rev-Table-Data ${className}`}>
        {children}
      </td>
    )
  }
}
Table.Data = TableData
