import React from 'react'
import { Row, Col } from './grid'
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

export interface DataGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Add striped styling to the grid
   */
  striped?: boolean
  /**
   * Enable horizontal scrolling
   */
  horizontalScroll?: boolean
  /**
   * Enable vertical scrolling
   */
  verticalScroll?: boolean
  /**
   * Stack cells vertically at all breakpoints
   */
  stacked?: boolean
  /**
   * Stack cells vertically at small breakpoints
   */
  stackForSmall?: boolean
  /**
   * Stack cells vertically at medium breakpoints
   */
  stackForMedium?: boolean
  /**
   * Stack cells vertically at large breakpoints
   */
  stackForLarge?: boolean
}

export interface DataGridHeaderRowProps extends React.ComponentProps<typeof Row> {}
export interface DataGridHeaderColProps extends React.ComponentProps<typeof Col> {}
export interface DataGridHeaderRowStackedProps extends React.ComponentProps<typeof Row> {}
export interface DataGridHeaderInlineProps extends React.HTMLAttributes<HTMLSpanElement> {}
export interface DataGridBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DataGridRowProps extends React.ComponentProps<typeof Row> {}
export interface DataGridColProps extends React.ComponentProps<typeof Col> {}

/**
 * A component for displaying tabular data with various configuration options
 */
const DataGrid: React.FC<DataGridProps> & {
  HeaderRow: React.FC<DataGridHeaderRowProps>
  HeaderCol: React.FC<DataGridHeaderColProps>
  HeaderRowStacked: React.FC<DataGridHeaderRowStackedProps>
  HeaderInline: React.FC<DataGridHeaderInlineProps>
  Body: React.FC<DataGridBodyProps>
  Row: React.FC<DataGridRowProps>
  Col: React.FC<DataGridColProps>
} = ({
  className,
  children,
  ...props
}) => {
  const propClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (props[name as keyof typeof props]) {
      propClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete props[name as keyof typeof props]
  })

  const newClassName = classNames(className, 'rev-DataGrid', propClassNames)

  return (
    <div {...props} className={newClassName}>
      {children}
    </div>
  )
}

const DataGridHeaderRow: React.FC<DataGridHeaderRowProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <Row {...props} className={`rev-DataGrid-headerRow ${className}`}>
      {children}
    </Row>
  )
}
DataGrid.HeaderRow = DataGridHeaderRow

const DataGridHeaderCol: React.FC<DataGridHeaderColProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <Col {...props} className={`rev-DataGrid-headerCol ${className}`}>
      {children}
    </Col>
  )
}
DataGrid.HeaderCol = DataGridHeaderCol

const DataGridHeaderRowStacked: React.FC<DataGridHeaderRowStackedProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <Row {...props} className={`rev-DataGrid-headerRow rev-DataGrid-headerRow--stacked ${className}`}>
      {children}
    </Row>
  )
}
DataGrid.HeaderRowStacked = DataGridHeaderRowStacked

const DataGridHeaderInline: React.FC<DataGridHeaderInlineProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <span {...props} className={`rev-DataGrid-header--inline ${className}`}>
      {children}
    </span>
  )
}
DataGrid.HeaderInline = DataGridHeaderInline

const DataGridBody: React.FC<DataGridBodyProps> = ({
  className = '',
  children
}) => {
  return (
    <div className={`rev-DataGrid-body ${className}`}>
      {children}
    </div>
  )
}
DataGrid.Body = DataGridBody

const DataGridRow: React.FC<DataGridRowProps> = ({
  className = '',
  children
}) => {
  return (
    <Row className={`rev-DataGrid-row ${className}`}>
      {children}
    </Row>
  )
}
DataGrid.Row = DataGridRow

const DataGridCol: React.FC<DataGridColProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <Col {...props} className={`rev-DataGrid-col ${className}`}>
      {children}
    </Col>
  )
}
DataGrid.Col = DataGridCol

export default DataGrid 