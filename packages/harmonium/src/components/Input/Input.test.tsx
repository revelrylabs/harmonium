import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Input} from './Input'
import {Field, FieldLabel, FieldError} from '../Field'

describe('Input', () => {
  it('renders an input', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('connects to Field context', () => {
    render(
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input />
      </Field>,
    )
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Name')
    expect(input.id).toBe(label.getAttribute('for'))
  })

  it('sets aria-invalid when field has error', () => {
    render(
      <Field error>
        <Input />
        <FieldError>Required</FieldError>
      </Field>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies size', () => {
    render(<Input size="lg" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', 'lg')
  })

  it('supports disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
