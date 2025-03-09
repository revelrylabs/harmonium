import React from 'react'
import { render, screen } from '@testing-library/react'
import Table from './Table'

describe('Table', () => {
  it('should render without throwing', () => {
    render(<Table />)
    expect(document.querySelector('.rev-Table')).toBeInTheDocument()
  })

  it('should add className to component', () => {
    const testClassName = '__TEST__'
    render(<Table className={testClassName} />)
    
    const table = document.querySelector('.rev-Table')
    expect(table).toHaveClass('rev-Table')
    expect(table).toHaveClass(testClassName)
  })

  it('should apply boolean styling props', () => {
    render(<Table striped horizontalScroll />)
    
    const table = document.querySelector('.rev-Table')
    expect(table).toHaveClass('rev-Table--striped')
    expect(table).toHaveClass('rev-Table--horizontalScroll')
  })

  it('should render children properly', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Header 1</Table.Header>
            <Table.Header>Header 2</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Data>Data 1</Table.Data>
            <Table.Data>Data 2</Table.Data>
          </Table.Row>
        </Table.Body>
      </Table>
    )
    
    expect(screen.getByText('Header 1')).toBeInTheDocument()
    expect(screen.getByText('Header 2')).toBeInTheDocument()
    expect(screen.getByText('Data 1')).toBeInTheDocument()
    expect(screen.getByText('Data 2')).toBeInTheDocument()
  })
})

describe('Table subcomponents', () => {
  it('should render Table.Head correctly', () => {
    render(<Table.Head className="test-class">Head Content</Table.Head>)
    
    const head = document.querySelector('.rev-Table-head')
    expect(head).toHaveClass('rev-Table-head')
    expect(head).toHaveClass('test-class')
    expect(screen.getByText('Head Content')).toBeInTheDocument()
  })

  it('should render Table.HeadStacked correctly', () => {
    render(<Table.HeadStacked className="test-class">Stacked Head</Table.HeadStacked>)
    
    const head = document.querySelector('.rev-Table-head--stacked')
    expect(head).toHaveClass('rev-Table-head')
    expect(head).toHaveClass('rev-Table-head--stacked')
    expect(head).toHaveClass('test-class')
    expect(screen.getByText('Stacked Head')).toBeInTheDocument()
  })

  it('should render Table.Header correctly', () => {
    render(<Table.Header className="test-class">Header Content</Table.Header>)
    
    const header = document.querySelector('.rev-Table-header')
    expect(header).toHaveClass('rev-Table-header')
    expect(header).toHaveClass('test-class')
    expect(screen.getByText('Header Content')).toBeInTheDocument()
  })

  it('should render Table.HeaderInline correctly', () => {
    render(<Table.HeaderInline className="test-class">Inline Header</Table.HeaderInline>)
    
    const header = document.querySelector('.rev-Table-header--inline')
    expect(header).toHaveClass('rev-Table-header')
    expect(header).toHaveClass('rev-Table-header--inline')
    expect(header).toHaveClass('test-class')
    expect(screen.getByText('Inline Header')).toBeInTheDocument()
  })

  it('should render Table.Body correctly', () => {
    render(<Table.Body className="test-class">Body Content</Table.Body>)
    
    const body = document.querySelector('.rev-Table-body')
    expect(body).toHaveClass('rev-Table-body')
    expect(body).toHaveClass('test-class')
    expect(screen.getByText('Body Content')).toBeInTheDocument()
  })

  it('should render Table.Row correctly', () => {
    render(<Table.Row className="test-class">Row Content</Table.Row>)
    
    const row = document.querySelector('.rev-Table-row')
    expect(row).toHaveClass('rev-Table-row')
    expect(row).toHaveClass('test-class')
    expect(screen.getByText('Row Content')).toBeInTheDocument()
  })

  it('should render Table.Data correctly', () => {
    render(<Table.Data className="test-class">Cell Data</Table.Data>)
    
    const cell = document.querySelector('.rev-Table-Data')
    expect(cell).toHaveClass('rev-Table-Data')
    expect(cell).toHaveClass('test-class')
    expect(screen.getByText('Cell Data')).toBeInTheDocument()
  })
}) 