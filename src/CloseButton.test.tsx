import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CloseButton from './CloseButton'

describe('CloseButton', () => {
  it('should render without throwing', () => {
    render(<CloseButton />)
    // Should render without errors
  })

  it('should add className to button', () => {
    const testClassName = '__TEST__'
    const { container } = render(<CloseButton className={testClassName} />)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('rev-CloseButton')
    expect(button).toHaveClass(testClassName)
  })

  it('should render children', () => {
    const childText = 'Close'
    const { getByText } = render(<CloseButton>{childText}</CloseButton>)
    
    expect(getByText(childText)).toBeInTheDocument()
  })

  it('should handle absolute prop', () => {
    const { container } = render(<CloseButton absolute />)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('rev-CloseButton--absolute')
  })

  it('should call onClick handler when clicked', () => {
    const onClick = jest.fn()
    const { container } = render(<CloseButton onClick={onClick} />)
    
    const button = container.querySelector('button')
    fireEvent.click(button!)
    
    expect(onClick).toHaveBeenCalled()
  })

  it('should have type="button" by default', () => {
    const { container } = render(<CloseButton />)
    
    const button = container.querySelector('button')
    expect(button).toHaveAttribute('type', 'button')
  })
}) 