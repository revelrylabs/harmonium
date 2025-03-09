import React from 'react'
import { render, screen } from '@testing-library/react'
import CheckableFieldset from './CheckableFieldset'

describe('CheckableFieldset', () => {
  it('renders without throwing', () => {
    render(<CheckableFieldset />)
    expect(document.querySelector('.rev-CheckableFieldset')).toBeInTheDocument()
  })

  it('adds className to component', () => {
    const testClassName = '__TEST__'
    render(<CheckableFieldset className={testClassName} />)
    
    const fieldset = document.querySelector('.rev-CheckableFieldset')
    expect(fieldset).toHaveClass('rev-CheckableFieldset')
    expect(fieldset).toHaveClass('fieldset')
    expect(fieldset).toHaveClass(testClassName)
  })

  it('renders label when provided', () => {
    render(<CheckableFieldset label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <CheckableFieldset>
        <div data-testid="test-child">Test Child</div>
      </CheckableFieldset>
    )
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('renders help text when provided', () => {
    render(<CheckableFieldset help="Help Text" />)
    expect(screen.getByText('Help Text')).toBeInTheDocument()
  })

  it('renders error message when provided', () => {
    render(<CheckableFieldset error="Error Message" />)
    
    expect(screen.getByText('Error Message')).toBeInTheDocument()
    expect(document.querySelector('.is-invalid-fieldset')).toBeInTheDocument()
  })

  it('applies error styling', () => {
    render(<CheckableFieldset error />)
    
    const fieldset = document.querySelector('.rev-CheckableFieldset')
    expect(fieldset).toHaveClass('is-invalid-fieldset')
  })

  it('passes through other props', () => {
    render(<CheckableFieldset data-testid="test-fieldset" />)
    expect(screen.getByTestId('test-fieldset')).toBeInTheDocument()
  })
}) 