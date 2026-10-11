import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {TimePicker} from './TimePicker'
import {Field, FieldLabel, FieldDescription, FieldError} from '../Field'

expect.extend(matchers)

describe('TimePicker', () => {
  it('renders a time input', () => {
    render(<TimePicker aria-label="Time" />)
    const input = document.querySelector('input[type="time"]')
    expect(input).toBeInTheDocument()
  })

  it('connects to Field context', () => {
    render(
      <Field>
        <FieldLabel>Start Time</FieldLabel>
        <TimePicker />
      </Field>,
    )
    const input = document.querySelector('input[type="time"]') as HTMLInputElement
    const label = screen.getByText('Start Time')
    expect(input.id).toBe(label.getAttribute('for'))
  })

  it('applies size', () => {
    render(<TimePicker aria-label="Time" data-testid="tp" size="sm" />)
    expect(screen.getByTestId('tp')).toHaveAttribute('data-size', 'sm')
  })

  it('is described by the Field parts and invalid on error', () => {
    render(
      <Field error>
        <FieldLabel>Start Time</FieldLabel>
        <FieldDescription>Help</FieldDescription>
        <TimePicker />
        <FieldError>Required</FieldError>
      </Field>,
    )
    const input = screen.getByLabelText('Start Time')
    expect(input).toHaveAttribute('type', 'time')
    expect(input).toHaveAccessibleDescription('Help Required')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <Field>
        <FieldLabel>Start Time</FieldLabel>
        <TimePicker />
      </Field>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
