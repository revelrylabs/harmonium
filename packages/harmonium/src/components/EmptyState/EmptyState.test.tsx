import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import {EmptyState} from './EmptyState'

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No results" />)
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <EmptyState title="No results" description="Try adjusting your filters." />,
    )
    expect(screen.getByText('Try adjusting your filters.')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const {container} = render(<EmptyState title="No results" />)
    expect(container.querySelector('p')).not.toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    render(
      <EmptyState
        title="No results"
        icon={<span data-testid="icon">📭</span>}
      />,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders action when provided', () => {
    render(
      <EmptyState
        title="No results"
        action={<button>Clear filters</button>}
      />,
    )
    expect(
      screen.getByRole('button', {name: 'Clear filters'}),
    ).toBeInTheDocument()
  })

  it('defaults to md size', () => {
    render(<EmptyState data-testid="empty" title="No results" />)
    expect(screen.getByTestId('empty')).toHaveAttribute('data-size', 'md')
  })

  it('applies size data attribute', () => {
    render(<EmptyState data-testid="empty" title="No results" size="lg" />)
    expect(screen.getByTestId('empty')).toHaveAttribute('data-size', 'lg')
  })

  it('merges custom className', () => {
    render(
      <EmptyState data-testid="empty" title="No results" className="custom" />,
    )
    expect(screen.getByTestId('empty')).toHaveClass('custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn<(el: HTMLDivElement | null) => void>()
    render(<EmptyState ref={ref} title="No results" />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })
})
