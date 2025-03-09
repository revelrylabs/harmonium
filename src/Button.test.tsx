import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button'

describe('Button', () => {
  it('should render without throwing', () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('should add className to component', () => {
    const testClassName = '__TEST__'
    render(<Button className={testClassName}>Test Button</Button>)
    
    const button = screen.getByText('Test Button')
    expect(button).toHaveClass('rev-Button')
    expect(button).toHaveClass(testClassName)
  })

  it('should handle props for different button types', () => {
    render(<Button secondary>Secondary Button</Button>)
    
    const button = screen.getByText('Secondary Button')
    expect(button).toHaveClass('rev-Button--secondary')
  })

  it('should correctly disable a button', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getByText('Disabled Button')
    expect(button).toHaveClass('disabled')
    expect(button).toHaveClass('rev-Button--disabled')
    expect(button).toBeDisabled()
  })

  it('should render as an anchor when href is provided', () => {
    render(<Button href="https://example.com">Link Button</Button>)
    
    const button = screen.getByText('Link Button')
    expect(button.tagName).toBe('A')
    expect(button).toHaveAttribute('href', 'https://example.com')
  })

  it('should render with an icon when provided', () => {
    render(<Button icon="test-icon">Icon Button</Button>)
    
    expect(screen.getByText('Icon Button')).toBeInTheDocument()
    const icon = document.querySelector('.rev-Button-icon')
    expect(icon).toBeInTheDocument()
  })
}) 