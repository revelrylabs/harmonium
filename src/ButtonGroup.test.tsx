import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ButtonGroup from './ButtonGroup'

describe('ButtonGroup', () => {
  it('should render without throwing', () => {
    render(<ButtonGroup>Button Group</ButtonGroup>)
    expect(screen.getByText('Button Group')).toBeInTheDocument()
  })

  it('should add className to element', () => {
    const testClassName = '__TEST__'
    render(<ButtonGroup className={testClassName}>Button Group</ButtonGroup>)
    
    const buttonGroup = screen.getByText('Button Group').parentElement
    expect(buttonGroup).toHaveClass('rev-ButtonGroup')
    expect(buttonGroup).toHaveClass(testClassName)
  })

  it('should handle props for different types of button groups', () => {
    render(<ButtonGroup secondary>Secondary Button Group</ButtonGroup>)
    
    const buttonGroup = screen.getByText('Secondary Button Group').parentElement
    expect(buttonGroup).toHaveClass('rev-ButtonGroup--secondary')
  })
  
  it('should handle size props', () => {
    render(<ButtonGroup small>Small Button Group</ButtonGroup>)
    
    const buttonGroup = screen.getByText('Small Button Group').parentElement
    expect(buttonGroup).toHaveClass('rev-ButtonGroup--small')
  })
  
  it('should handle style props', () => {
    render(<ButtonGroup primary>Primary Button Group</ButtonGroup>)
    
    const buttonGroup = screen.getByText('Primary Button Group').parentElement
    expect(buttonGroup).toHaveClass('rev-ButtonGroup--primary')
  })
  
  it('should handle multiple props', () => {
    render(
      <ButtonGroup large expanded>
        Large Expanded Button Group
      </ButtonGroup>
    )
    
    const buttonGroup = screen.getByText('Large Expanded Button Group').parentElement
    expect(buttonGroup).toHaveClass('rev-ButtonGroup--large')
    expect(buttonGroup).toHaveClass('rev-ButtonGroup--expanded')
  })
}) 