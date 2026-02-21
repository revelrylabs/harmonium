import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Stack} from './Stack'

describe('Stack', () => {
  it('renders children', () => {
    render(<Stack data-testid="stack"><span>Item</span></Stack>)
    expect(screen.getByTestId('stack')).toBeInTheDocument()
    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('defaults to vertical direction and md gap', () => {
    render(<Stack data-testid="stack">Content</Stack>)
    const el = screen.getByTestId('stack')
    expect(el).toHaveAttribute('data-direction', 'vertical')
    expect(el).toHaveAttribute('data-gap', 'md')
  })

  it('applies horizontal direction', () => {
    render(<Stack data-testid="stack" direction="horizontal">Content</Stack>)
    expect(screen.getByTestId('stack')).toHaveAttribute('data-direction', 'horizontal')
  })

  it('applies align and justify', () => {
    render(<Stack data-testid="stack" align="center" justify="between">Content</Stack>)
    const el = screen.getByTestId('stack')
    expect(el).toHaveAttribute('data-align', 'center')
    expect(el).toHaveAttribute('data-justify', 'between')
  })

  it('applies wrap', () => {
    render(<Stack data-testid="stack" wrap>Content</Stack>)
    expect(screen.getByTestId('stack')).toHaveAttribute('data-wrap')
  })

  it('merges custom className', () => {
    render(<Stack data-testid="stack" className="custom">Content</Stack>)
    expect(screen.getByTestId('stack')).toHaveClass('custom')
  })
})
