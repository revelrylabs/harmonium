import React, {Component} from 'react'
import {Row, Col} from 'harmonium-react/lib/grid'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  striped: 'rev-DataGrid--striped',
  horizontalScroll: 'rev-DataGrid--horizontalScroll',
  verticalScroll: 'rev-DataGrid--verticalScroll',
  stacked: 'rev-DataGrid--stacked',
  stackForSmall: 'rev-DataGrid--stackForSmall',
  stackForMedium: 'rev-DataGrid--stackForMedium',
  stackForLarge: 'rev-DataGrid--stackForLarge',
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class DataGrid extends React.Component {
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

    const newClassName = classNames(className, 'rev-DataGrid', propClassNames)

    return (
      <div {...props} className={newClassName}>
        {children}
      </div>
    )
  }
}

class DataGridHeaderRow extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <Row {...props} className={`rev-DataGrid-headerRow ${className}`}>
        {children}
      </Row>
    )
  }
}
DataGrid.HeaderRow = DataGridHeaderRow

class DataGridHeaderCol extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <Col {...props} className={`rev-DataGrid-headerCol ${className}`}>
        {children}
      </Col>
    )
  }
}
DataGrid.HeaderCol = DataGridHeaderCol

class DataGridHeaderRowStacked extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <Row {...props} className={`rev-DataGrid-headerRow rev-DataGrid-headerRow--stacked ${className}`}>
        {children}
      </Row>
    )
  }
}
DataGrid.HeaderRowStacked = DataGridHeaderRowStacked

class DataGridHeaderInline extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <span {...props} className={`rev-DataGrid-header--inline ${className}`}>
        {children}
      </span>
    )
  }
}
DataGrid.HeaderInline = DataGridHeaderInline

class DataGridBody extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children} = this.props

    return (
      <div className={`rev-DataGrid-body ${className}`}>
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
      <Row className={`rev-DataGrid-row ${className}`}>
        {children}
      </Row>
    )
  }
}
DataGrid.Row = DataGridRow

class DataGridCol extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <Col {...props} className={`rev-DataGrid-col ${className}`}>
        {children}
      </Col>
    )
  }
}
DataGrid.Col = DataGridCol
