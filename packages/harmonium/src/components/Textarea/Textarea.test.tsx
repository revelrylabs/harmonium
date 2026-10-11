import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {Textarea} from './Textarea'
import {Field, FieldLabel, FieldDescription} from '../Field'

expect.extend(matchers)

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

  it('is described by the Field description', () => {
    render(
      <Field>
        <FieldLabel>Bio</FieldLabel>
        <FieldDescription>Keep it short</FieldDescription>
        <Textarea />
      </Field>,
    )
    expect(screen.getByRole('textbox', {name: 'Bio'})).toHaveAccessibleDescription('Keep it short')
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <Field>
        <FieldLabel>Bio</FieldLabel>
        <Textarea />
      </Field>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
