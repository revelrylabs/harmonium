import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {axe} from 'vitest-axe'
import {Show} from './Show'

describe('Show', () => {
  it('renders children', () => {
    render(<Show data-testid="show">Content</Show>)
    expect(screen.getByTestId('show')).toHaveTextContent('Content')
  })

  it('applies above data attribute', () => {
    render(<Show data-testid="show" above="md">Content</Show>)
    expect(screen.getByTestId('show')).toHaveAttribute('data-above', 'md')
  })

  it('applies below data attribute', () => {
    render(<Show data-testid="show" below="lg">Content</Show>)
    expect(screen.getByTestId('show')).toHaveAttribute('data-below', 'lg')
  })

  it('merges custom className', () => {
    render(<Show data-testid="show" className="custom" above="sm">Content</Show>)
    expect(screen.getByTestId('show')).toHaveClass('custom')
  })

  it('does not render above or below when not provided', () => {
    render(<Show data-testid="show">Content</Show>)
    const el = screen.getByTestId('show')
    expect(el).not.toHaveAttribute('data-above')
    expect(el).not.toHaveAttribute('data-below')
  })
})

describe('Show accessibility', () => {
  it('has no axe violations', async () => {
    const {container} = render(
      <Show above="md">Desktop only</Show>,
    )
    expect(
      await axe(container, {rules: {'color-contrast': {enabled: false}}}),
    ).toHaveNoViolations()
  })
})
