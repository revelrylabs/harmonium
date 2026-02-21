import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Separator} from './Separator'

describe('Separator', () => {
  it('renders with separator role', () => {
    render(<Separator />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('defaults to horizontal orientation', () => {
    render(<Separator />)
    const el = screen.getByRole('separator')
    expect(el).toHaveAttribute('data-orientation', 'horizontal')
    expect(el).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('supports vertical orientation', () => {
    render(<Separator orientation="vertical" />)
    const el = screen.getByRole('separator')
    expect(el).toHaveAttribute('data-orientation', 'vertical')
    expect(el).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('applies spacing', () => {
    render(<Separator spacing="lg" />)
    expect(screen.getByRole('separator')).toHaveAttribute('data-spacing', 'lg')
  })
})
