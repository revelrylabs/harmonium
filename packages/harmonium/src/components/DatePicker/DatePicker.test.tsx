import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {DatePicker} from './DatePicker'
import {Field, FieldLabel} from '../Field'

describe('DatePicker', () => {
  it('renders a date input', () => {
    render(<DatePicker aria-label="Date" />)
    // date inputs don't have a specific role in jsdom, check by type
    const input = document.querySelector('input[type="date"]')
    expect(input).toBeInTheDocument()
  })

  it('connects to Field context', () => {
    render(
      <Field>
        <FieldLabel>Start Date</FieldLabel>
        <DatePicker />
      </Field>,
    )
    const input = document.querySelector('input[type="date"]') as HTMLInputElement
    const label = screen.getByText('Start Date')
    expect(input.id).toBe(label.getAttribute('for'))
  })

  it('applies size', () => {
    render(<DatePicker aria-label="Date" data-testid="dp" size="lg" />)
    expect(screen.getByTestId('dp')).toHaveAttribute('data-size', 'lg')
  })

  it('accepts min and max', () => {
    render(<DatePicker aria-label="Date" min="2024-01-01" max="2024-12-31" />)
    const input = document.querySelector('input[type="date"]') as HTMLInputElement
    expect(input).toHaveAttribute('min', '2024-01-01')
    expect(input).toHaveAttribute('max', '2024-12-31')
  })
})
