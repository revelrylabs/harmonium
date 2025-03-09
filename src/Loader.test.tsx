import React from 'react'
import { render, screen } from '@testing-library/react'
import Loader from './Loader'

describe('Loader', () => {
  it('renders without throwing', () => {
    render(<Loader />)
    expect(document.querySelector('.rev-Loader')).toBeInTheDocument()
  })

  it('renders a small variation if prop "small" is specified as true', () => {
    render(<Loader small />)
    
    const loader = document.querySelector('.rev-Loader')
    expect(loader).toHaveClass('rev-Loader--small')
  })

  it('renders a medium variation if prop "medium" is specified as true', () => {
    render(<Loader medium />)
    
    const loader = document.querySelector('.rev-Loader')
    expect(loader).toHaveClass('rev-Loader--medium')
  })

  it('renders a large variation if prop "large" is specified as true', () => {
    render(<Loader large />)
    
    const loader = document.querySelector('.rev-Loader')
    expect(loader).toHaveClass('rev-Loader--large')
  })

  it('renders a huge variation if prop "huge" is specified as true', () => {
    render(<Loader huge />)
    
    const loader = document.querySelector('.rev-Loader')
    expect(loader).toHaveClass('rev-Loader--huge')
  })

  it('assigns a variation on animation-duration when prop "duration" is specified', () => {
    render(<Loader duration="600ms" data-testid="loader" />)
    
    const loader = screen.getByTestId('loader')
    expect(loader).toHaveStyle('animation-duration: 600ms')
  })

  it('assigns a variation on border-top-color when prop "color" is specified', () => {
    render(<Loader color="#000000" data-testid="loader" />)
    
    const loader = screen.getByTestId('loader')
    expect(loader).toHaveStyle('border-top-color: #000000')
  })

  it('assigns a variation on border-color when prop "secondaryColor" is specified', () => {
    render(<Loader secondaryColor="#FFFFFF" data-testid="loader" />)
    
    const loader = screen.getByTestId('loader')
    expect(loader).toHaveStyle('border-color: #FFFFFF')
  })

  it('applies custom styles when prop "style" is specified', () => {
    render(<Loader style={{ margin: '10px' }} data-testid="loader" />)
    
    const loader = screen.getByTestId('loader')
    expect(loader).toHaveStyle('margin: 10px')
  })

  it('applies width and height when prop "size" is specified', () => {
    render(<Loader size="50px" data-testid="loader" />)
    
    const loader = screen.getByTestId('loader')
    expect(loader).toHaveStyle('width: 50px; height: 50px')
  })

  it('throws an error if more than one size-related prop is specified', () => {
    // Use jest.spyOn to monitor console.error, which React will call when rendering fails
    const originalError = console.error
    console.error = jest.fn()
    
    expect(() => {
      render(<Loader small medium />)
    }).toThrow()
    
    // Restore console.error
    console.error = originalError
  })
}) 