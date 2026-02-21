import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Spinner} from './Spinner'

describe('Spinner', () => {
  it('renders with status role', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has default aria-label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading')
  })

  it('accepts custom label', () => {
    render(<Spinner label="Saving" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving')
  })

  it('applies size', () => {
    render(<Spinner size="lg" />)
    expect(screen.getByRole('status')).toHaveAttribute('data-size', 'lg')
  })
})
