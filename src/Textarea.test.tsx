import React from 'react'
import { render, screen } from '@testing-library/react'
import Textarea from './Textarea'

describe('Textarea', () => {
  it('should render without throwing', () => {
    render(<Textarea />)
    expect(document.querySelector('.rev-Textarea')).toBeInTheDocument()
  })

  it('should add className to component', () => {
    const testClassName = '__TEST__'
    render(<Textarea className={testClassName} />)
    
    const textarea = document.querySelector('.rev-Textarea')
    expect(textarea).toHaveClass('rev-Textarea')
    expect(textarea).toHaveClass(testClassName)
  })

  it('should handle error prop', () => {
    render(<Textarea error="Error message" />)
    
    const textarea = document.querySelector('.rev-Textarea')
    expect(textarea).toHaveClass('is-invalid-input')
    expect(textarea).toHaveClass('is-invalid')
  })

  it('should pass through other props', () => {
    render(<Textarea placeholder="Enter text" data-testid="test-textarea" />)
    
    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('placeholder', 'Enter text')
  })
})

describe('Textarea.Stack', () => {
  it('should render without throwing', () => {
    render(<Textarea.Stack />)
    expect(document.querySelector('.rev-TextareaStack')).toBeInTheDocument()
  })

  it('should add className to component', () => {
    const testClassName = '__TEST__'
    render(<Textarea.Stack className={testClassName} />)
    
    const stackContainer = document.querySelector('.rev-TextareaStack')
    expect(stackContainer).toHaveClass('rev-TextareaStack')
    expect(stackContainer).toHaveClass(testClassName)
  })

  it('should render label text', () => {
    render(<Textarea.Stack label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('should render help text', () => {
    render(<Textarea.Stack help="Help text" />)
    expect(screen.getByText('Help text')).toBeInTheDocument()
  })

  it('should display error messages', () => {
    render(<Textarea.Stack error="Error message" />)
    
    const textarea = document.querySelector('.rev-Textarea')
    expect(textarea).toHaveClass('is-invalid-input')
    expect(textarea).toHaveClass('is-invalid')
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })
}) 