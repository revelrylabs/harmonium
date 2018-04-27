import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class DataGrid extends React.Component {
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


class DataGridHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <div {...props} className={`rev-Table-head Hide--mediumDown ${className}`}>
        {children}
      </div>
    )
  }
}
DataGrid.Header = DataGridHeader


class DataGridHeaderSmall extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <div {...props} className={`rev-Table-head Hide--mediumUp ${className}`}>
        {children}
      </div>
    )
  }
}
DataGrid.HeaderSmall = DataGridHeaderSmall


class DataGridBody extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children} = this.props

    return (
      <div className={`rev-Table-body rev-Table--scroll ${className}`}>
        {children}
      </div>
    )
  }
}
DataGrid.Body = DataGridBody


class DataGridRow extends Component {
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
DataGrid.Row = DataGridRow
