import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {DatePicker} from './DatePicker'
import {Field, FieldLabel, FieldDescription, FieldError} from '../Field'

expect.extend(matchers)

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

  it('is described by the Field parts and invalid on error', () => {
    render(
      <Field error>
        <FieldLabel>Start Date</FieldLabel>
        <FieldDescription>Help</FieldDescription>
        <DatePicker />
        <FieldError>Required</FieldError>
      </Field>,
    )
    const input = screen.getByLabelText('Start Date')
    expect(input).toHaveAttribute('type', 'date')
    expect(input).toHaveAccessibleDescription('Help Required')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <Field>
        <FieldLabel>Start Date</FieldLabel>
        <DatePicker />
      </Field>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
