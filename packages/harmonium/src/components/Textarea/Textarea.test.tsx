import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Textarea} from './Textarea'
import {Field, FieldLabel} from '../Field'

describe('Textarea', () => {
  it('renders a textarea', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('connects to Field context', () => {
    render(
      <Field>
        <FieldLabel>Bio</FieldLabel>
        <Textarea />
      </Field>,
    )
    const textarea = screen.getByRole('textbox')
    const label = screen.getByText('Bio')
    expect(textarea.id).toBe(label.getAttribute('for'))
  })

  it('sets aria-invalid when field has error', () => {
    render(
      <Field error>
        <Textarea />
      </Field>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })
})
