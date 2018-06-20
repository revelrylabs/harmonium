import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  striped: 'rev-Table--striped',
  horizontalScroll: 'rev-Table--horizontalScroll',
  stacked: 'rev-Table--stacked',
  stackForSmall: 'rev-Table--stackForSmall',
  stackForMedium: 'rev-Table--stackForMedium',
  stackForLarge: 'rev-Table--stackForLarge',
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class Table extends React.Component {
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

    const newClassName = classNames(className, 'rev-Table', propClassNames)

    return (
      <div className="rev-TableContainer">
        <table {...props} className={newClassName}>
          {children}
        </table>
      </div>
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
      <thead {...props} className={`rev-Table-head ${className}`}>
        {children}
      </thead>
    )
  }
}
Table.Head = TableHead

class TableHeadStacked extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <thead {...props} className={`rev-Table-head rev-Table-head--stacked ${className}`}>
        {children}
      </thead>
    )
  }
}
Table.HeadStacked = TableHeadStacked


class TableHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <th {...props} className={`rev-Table-header ${className}`}>
        {children}
      </th>
    )
  }
}
Table.Header = TableHeader


class TableHeaderStacked extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <span {...props} className={`rev-Table-header rev-Table-header--stacked ${className}`}>
        {children}
      </span>
    )
  }
}
Table.HeaderStacked = TableHeaderStacked


class TableBody extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children} = this.props

    return (
      <tbody className={`rev-Table-body ${className}`}>
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
      <tr className={`rev-Table-row ${className}`}>
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
