import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {TimePicker} from './TimePicker'
import {Field, FieldLabel} from '../Field'

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
})
