import React from 'react'
import { render, screen } from '@testing-library/react'
import Select from './Select'

describe('Select', () => {
  it('should render without throwing', () => {
    render(<Select />)
    expect(document.querySelector('.rev-Select')).toBeInTheDocument()
  })

  it('should add className to component', () => {
    const testClassName = '__TEST__'
    render(<Select className={testClassName} />)
    
    const select = document.querySelector('.rev-Select')
    expect(select).toHaveClass('rev-Select')
    expect(select).toHaveClass(testClassName)
  })

  it('handles options', () => {
    const OPTIONS = [
      { label: 'North', value: 'N' },
      { label: 'South', value: 'S' },
      { label: 'East', value: 'E' },
      { label: 'West', value: 'W' },
    ]

    render(<Select options={OPTIONS} />)
    
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(OPTIONS.length)
    expect(options[0]).toHaveTextContent('North')
    expect(options[0]).toHaveValue('N')
    expect(options[1]).toHaveTextContent('South')
    expect(options[1]).toHaveValue('S')
  })

  it('applies error styling', () => {
    render(<Select error />)
    
    const select = document.querySelector('.rev-Select')
    expect(select).toHaveClass('is-invalid-input')
    expect(select).toHaveClass('is-invalid')
  })

  it('renders children', () => {
    render(
      <Select>
        <option value="test">Test Option</option>
      </Select>
    )
    
    expect(screen.getByText('Test Option')).toBeInTheDocument()
    expect(screen.getByRole('option')).toHaveValue('test')
  })
})

describe('Select.Stack', () => {
  it('should render without throwing', () => {
    render(<Select.Stack />)
    expect(document.querySelector('.rev-SelectStack')).toBeInTheDocument()
  })

  it('should add className to component', () => {
    const testClassName = '__TEST__'
    render(<Select.Stack className={testClassName} />)
    
    const stackContainer = document.querySelector('.rev-SelectStack')
    expect(stackContainer).toHaveClass('rev-SelectStack')
    expect(stackContainer).toHaveClass(testClassName)
  })

  it('renders label text', () => {
    render(<Select.Stack label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders help text', () => {
    render(<Select.Stack help="Help text" />)
    expect(screen.getByText('Help text')).toBeInTheDocument()
  })

  it('displays error messages', () => {
    render(<Select.Stack error="Error message" />)
    
    const select = document.querySelector('.rev-Select')
    expect(select).toHaveClass('is-invalid-input')
    expect(select).toHaveClass('is-invalid')
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  it('renders children in the select', () => {
    render(
      <Select.Stack>
        <option value="test">Test Option</option>
      </Select.Stack>
    )
    
    expect(screen.getByText('Test Option')).toBeInTheDocument()
    expect(screen.getByRole('option')).toHaveValue('test')
  })
}) 