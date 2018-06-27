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
      <div {...props} className={`rev-DataGrid ${className}`}>
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
      <div {...props} className={`rev-DataGrid-head Hide--mediumDown ${className}`}>
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
      <div {...props} className={`rev-DataGrid-head Hide--mediumUp ${className}`}>
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
      <div className={`rev-DataGrid-body rev-DataGrid--scroll ${className}`}>
        {children}
      </div>
    )
  }
}
DataGrid.Body = DataGridBody
