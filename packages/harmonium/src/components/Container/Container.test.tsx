import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Container} from './Container'

describe('Container', () => {
  it('renders children', () => {
    render(<Container data-testid="container">Content</Container>)
    expect(screen.getByTestId('container')).toHaveTextContent('Content')
  })

  it('defaults to lg size and md padding', () => {
    render(<Container data-testid="container">Content</Container>)
    const el = screen.getByTestId('container')
    expect(el).toHaveAttribute('data-size', 'lg')
    expect(el).toHaveAttribute('data-padding', 'md')
  })

  it('applies size data attribute', () => {
    render(<Container data-testid="container" size="sm">Content</Container>)
    expect(screen.getByTestId('container')).toHaveAttribute('data-size', 'sm')
  })

  it('applies padding data attribute', () => {
    render(<Container data-testid="container" padding="lg">Content</Container>)
    expect(screen.getByTestId('container')).toHaveAttribute('data-padding', 'lg')
  })

  it('merges custom className', () => {
    render(<Container data-testid="container" className="custom">Content</Container>)
    expect(screen.getByTestId('container')).toHaveClass('custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn<(el: HTMLDivElement | null) => void>()
    render(<Container ref={ref}>Content</Container>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('passes through additional HTML attributes', () => {
    render(<Container data-testid="container" id="main-container">Content</Container>)
    expect(screen.getByTestId('container')).toHaveAttribute('id', 'main-container')
  })
})
