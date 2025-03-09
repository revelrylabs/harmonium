import React from 'react'
import { render, screen } from '@testing-library/react'
import Brand from './Brand'

describe('Brand', () => {
  it('should render without throwing', () => {
    render(<Brand />)
    // Should render without errors
  })

  it('should set the "src" attribute on the image element', () => {
    const path = 'path/to/image'
    const { container } = render(<Brand imagePath={path} />)
    
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', path)
  })

  it('should set the "alt" tag on the image element', () => {
    const altText = 'screen reader text'
    const { container } = render(<Brand altTag={altText} />)
    
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('alt', altText)
  })

  it('should set the link on the anchor element', () => {
    const link = '/some/example/link'
    const { container } = render(<Brand linkPath={link} />)
    
    const anchor = container.querySelector('a')
    expect(anchor).toHaveAttribute('href', link)
  })

  it('should include children when provided', () => {
    const brandText = 'Brand Name'
    render(<Brand>{brandText}</Brand>)
    
    expect(screen.getByText(brandText)).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const customClass = 'custom-brand'
    const { container } = render(<Brand className={customClass} />)
    
    const anchor = container.querySelector('a')
    expect(anchor).toHaveClass('rev-Brand')
    expect(anchor).toHaveClass(customClass)
  })
}) 