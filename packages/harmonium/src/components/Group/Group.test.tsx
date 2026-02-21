import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Group} from './Group'

describe('Group', () => {
  it('renders children in a horizontal row', () => {
    render(<Group data-testid="group"><span>A</span><span>B</span></Group>)
    expect(screen.getByTestId('group')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('defaults to md gap', () => {
    render(<Group data-testid="group">Content</Group>)
    expect(screen.getByTestId('group')).toHaveAttribute('data-gap', 'md')
  })

  it('applies grow attribute', () => {
    render(<Group data-testid="group" grow>Content</Group>)
    expect(screen.getByTestId('group')).toHaveAttribute('data-grow')
  })

  it('merges custom className', () => {
    render(<Group data-testid="group" className="custom">Content</Group>)
    expect(screen.getByTestId('group')).toHaveClass('custom')
  })
})
