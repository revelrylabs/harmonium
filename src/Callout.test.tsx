import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Callout from './Callout'

describe('Callout', () => {
  it('should render without throwing', () => {
    render(<Callout>Test Callout</Callout>)
    expect(screen.getByText('Test Callout')).toBeInTheDocument()
  })

  it('should add className to element', () => {
    const testClassName = '__TEST__'
    render(<Callout className={testClassName}>Test Callout</Callout>)
    
    const callout = screen.getByText('Test Callout').parentElement
    expect(callout).toHaveClass('rev-Callout')
    expect(callout).toHaveClass(testClassName)
  })

  it('handles type props', () => {
    render(<Callout alert>Alert Callout</Callout>)
    
    const callout = screen.getByText('Alert Callout').parentElement
    expect(callout).toHaveClass('alert')
    expect(callout).toHaveClass('rev-Callout--alert')
  })
  
  it('handles primary type prop', () => {
    render(<Callout primary>Primary Callout</Callout>)
    
    const callout = screen.getByText('Primary Callout').parentElement
    expect(callout).toHaveClass('primary')
    expect(callout).toHaveClass('rev-Callout--primary')
  })
  
  it('handles secondary type prop', () => {
    render(<Callout secondary>Secondary Callout</Callout>)
    
    const callout = screen.getByText('Secondary Callout').parentElement
    expect(callout).toHaveClass('secondary')
    expect(callout).toHaveClass('rev-Callout--secondary')
  })
  
  it('handles success type prop', () => {
    render(<Callout success>Success Callout</Callout>)
    
    const callout = screen.getByText('Success Callout').parentElement
    expect(callout).toHaveClass('success')
    expect(callout).toHaveClass('rev-Callout--success')
  })
  
  it('handles warning type prop', () => {
    render(<Callout warning>Warning Callout</Callout>)
    
    const callout = screen.getByText('Warning Callout').parentElement
    expect(callout).toHaveClass('warning')
    expect(callout).toHaveClass('rev-Callout--warning')
  })
}) 