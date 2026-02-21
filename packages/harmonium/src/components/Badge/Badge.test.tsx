import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Badge} from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('defaults to neutral variant and md size', () => {
    render(<Badge data-testid="badge">Tag</Badge>)
    const el = screen.getByTestId('badge')
    expect(el).toHaveAttribute('data-variant', 'neutral')
    expect(el).toHaveAttribute('data-size', 'md')
  })

  it('applies variant', () => {
    render(<Badge data-testid="badge" variant="success">Done</Badge>)
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'success')
  })

  it('applies size', () => {
    render(<Badge data-testid="badge" size="sm">S</Badge>)
    expect(screen.getByTestId('badge')).toHaveAttribute('data-size', 'sm')
  })
})
