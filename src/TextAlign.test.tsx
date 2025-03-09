import React from 'react'
import { render, screen } from '@testing-library/react'
import TextAlign from './TextAlign'

describe('TextAlign', () => {
  it('renders children properly', () => {
    render(
      <TextAlign>
        <div data-testid="test-element">Test Content</div>
      </TextAlign>
    )
    
    expect(screen.getByTestId('test-element')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('adds left alignment class', () => {
    render(
      <TextAlign left>
        <div data-testid="test-element">Test Content</div>
      </TextAlign>
    )
    
    expect(screen.getByTestId('test-element')).toHaveClass('Text-left')
  })

  it('adds right alignment class', () => {
    render(
      <TextAlign right>
        <div data-testid="test-element">Test Content</div>
      </TextAlign>
    )
    
    expect(screen.getByTestId('test-element')).toHaveClass('Text-right')
  })

  it('adds center alignment class', () => {
    render(
      <TextAlign center>
        <div data-testid="test-element">Test Content</div>
      </TextAlign>
    )
    
    expect(screen.getByTestId('test-element')).toHaveClass('Text-center')
  })

  it('adds justify alignment class', () => {
    render(
      <TextAlign justify>
        <div data-testid="test-element">Test Content</div>
      </TextAlign>
    )
    
    expect(screen.getByTestId('test-element')).toHaveClass('Text-justify')
  })

  it('adds responsive alignment classes', () => {
    render(
      <TextAlign smallCenter mediumRight largeLeft>
        <div data-testid="test-element">Test Content</div>
      </TextAlign>
    )
    
    const element = screen.getByTestId('test-element')
    expect(element).toHaveClass('Text--smallCenter')
    expect(element).toHaveClass('Text--mediumRight')
    expect(element).toHaveClass('Text--largeLeft')
  })

  it('preserves existing class names', () => {
    render(
      <TextAlign center>
        <div data-testid="test-element" className="existing-class">Test Content</div>
      </TextAlign>
    )
    
    const element = screen.getByTestId('test-element')
    expect(element).toHaveClass('existing-class')
    expect(element).toHaveClass('Text-center')
  })

  it('handles multiple alignment options', () => {
    render(
      <TextAlign left smallRight mediumCenter largeJustify>
        <div data-testid="test-element">Test Content</div>
      </TextAlign>
    )
    
    const element = screen.getByTestId('test-element')
    expect(element).toHaveClass('Text-left')
    expect(element).toHaveClass('Text--smallRight')
    expect(element).toHaveClass('Text--mediumCenter')
    expect(element).toHaveClass('Text--largeJustify')
  })
}) 