import React from 'react'
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

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string
  children?: React.ReactNode
  striped?: boolean
  horizontalScroll?: boolean
  stacked?: boolean
  stackForSmall?: boolean
  stackForMedium?: boolean
  stackForLarge?: boolean
}

/**
 * Table component for displaying data in a tabular format
 * @param props - Component props
 * @returns Table component
 */
const Table: React.FC<TableProps> & {
  Head: React.FC<TableHeadProps>
  HeadStacked: React.FC<TableHeadStackedProps>
  Header: React.FC<TableHeaderProps>
  HeaderInline: React.FC<TableHeaderInlineProps>
  Body: React.FC<TableBodyProps>
  Row: React.FC<TableRowProps>
  Data: React.FC<TableDataProps>
} = (props) => {
  const { className, children, ...passthrough } = props
  const propClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (passthrough[name as keyof typeof passthrough]) {
      propClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete passthrough[name as keyof typeof passthrough]
  })

  const newClassName = classNames(className, 'rev-Table', propClassNames)

  return (
    <div className="rev-TableContainer">
      <table {...passthrough} className={newClassName}>
        {children}
      </table>
    </div>
  )
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * TableHead component for table header section
 * @param props - Component props
 * @returns TableHead component
 */
const TableHead: React.FC<TableHeadProps> = (props) => {
  const { className = '', children, ...passthrough } = props

  return (
    <thead {...passthrough} className={`rev-Table-head ${className}`}>
      {children}
    </thead>
  )
}
Table.Head = TableHead

export interface TableHeadStackedProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * TableHeadStacked component for stacked table header
 * @param props - Component props
 * @returns TableHeadStacked component
 */
const TableHeadStacked: React.FC<TableHeadStackedProps> = (props) => {
  const { className = '', children, ...passthrough } = props

  return (
    <thead {...passthrough} className={`rev-Table-head rev-Table-head--stacked ${className}`}>
      {children}
    </thead>
  )
}
Table.HeadStacked = TableHeadStacked

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * TableHeader component for table headers
 * @param props - Component props
 * @returns TableHeader component
 */
const TableHeader: React.FC<TableHeaderProps> = (props) => {
  const { className = '', children, ...passthrough } = props

  return (
    <th {...passthrough} className={`rev-Table-header ${className}`}>
      {children}
    </th>
  )
}
Table.Header = TableHeader

export interface TableHeaderInlineProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * TableHeaderInline component for inline table headers
 * @param props - Component props
 * @returns TableHeaderInline component
 */
const TableHeaderInline: React.FC<TableHeaderInlineProps> = (props) => {
  const { className = '', children, ...passthrough } = props

  return (
    <span {...passthrough} className={`rev-Table-header rev-Table-header--inline ${className}`}>
      {children}
    </span>
  )
}
Table.HeaderInline = TableHeaderInline

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * TableBody component for table body section
 * @param props - Component props
 * @returns TableBody component
 */
const TableBody: React.FC<TableBodyProps> = (props) => {
  const { className = '', children } = props

  return (
    <tbody className={`rev-Table-body ${className}`}>
      {children}
    </tbody>
  )
}
Table.Body = TableBody

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * TableRow component for table rows
 * @param props - Component props
 * @returns TableRow component
 */
const TableRow: React.FC<TableRowProps> = (props) => {
  const { className = '', children } = props

  return (
    <tr className={`rev-Table-row ${className}`}>
      {children}
    </tr>
  )
}
Table.Row = TableRow

export interface TableDataProps extends React.HTMLAttributes<HTMLTableDataCellElement> {
  className?: string
  children?: React.ReactNode
}

/**
 * TableData component for table cells
 * @param props - Component props
 * @returns TableData component
 */
const TableData: React.FC<TableDataProps> = (props) => {
  const { className = '', children } = props

  return (
    <td className={`rev-Table-Data ${className}`}>
      {children}
    </td>
  )
}
Table.Data = TableData

export { TableHead, TableHeadStacked, TableHeader, TableHeaderInline, TableBody, TableRow, TableData }
export default Table 