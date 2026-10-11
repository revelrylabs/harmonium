import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Spinner} from './Spinner'
import {configureAxe} from 'vitest-axe'
// jsdom has no layout, so colour contrast can't be computed here
const axe = configureAxe({rules: {'color-contrast': {enabled: false}}})


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


  it('is announced by name as a status', () => {
    render(<Spinner label="Saving" />)
    expect(screen.getByRole('status', {name: 'Saving'})).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const {container} = render(<Spinner />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
