import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from './Input'

describe('Input', () => {
  it('should render without throwing', () => {
    render(<Input placeholder="Test Input" />)
    expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument()
  })

  it('should add className to input', () => {
    const testClassName = '__TEST__'
    render(<Input className={testClassName} placeholder="Test Input" />)
    
    const input = screen.getByPlaceholderText('Test Input')
    expect(input).toHaveClass('rev-Input')
    expect(input).toHaveClass(testClassName)
  })
  
  it('should show error state when error is provided', () => {
    render(<Input error="Error message" placeholder="Test Input" />)
    
    const input = screen.getByPlaceholderText('Test Input')
    expect(input).toHaveClass('is-invalid-input')
    expect(input).toHaveClass('is-invalid')
  })
})

describe('Input.Stack', () => {
  it('should render without throwing', () => {
    render(<Input.Stack label="Test Label" placeholder="Test Input" />)
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('should add className to wrapper', () => {
    const testClassName = '__TEST__'
    render(<Input.Stack className={testClassName} label="Test Label" placeholder="Test Input" />)
    
    // Find the parent label element
    const label = screen.getByText('Test Label').closest('label')
    expect(label).toHaveClass('rev-InputStack')
    expect(label).toHaveClass(testClassName)
  })
  
  it('should display help text when provided', () => {
    render(<Input.Stack help="Help text" label="Test Label" placeholder="Test Input" />)
    expect(screen.getByText('Help text')).toBeInTheDocument()
  })
  
  it('should display error message when provided', () => {
    render(<Input.Stack error="Error message" label="Test Label" placeholder="Test Input" />)
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })
}) 