import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {Input} from './Input'
import {Field, FieldLabel, FieldDescription, FieldError} from '../Field'

expect.extend(matchers)

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

  it('keeps an explicit id and points the label at it', () => {
    render(
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input id="custom-id" />
      </Field>,
    )
    expect(screen.getByRole('textbox', {name: 'Name'})).toHaveAttribute('id', 'custom-id')
    expect(screen.getByText('Name')).toHaveAttribute('for', 'custom-id')
  })

  it('merges consumer aria-describedby with the Field parts', () => {
    render(
      <>
        <p id="extra">Extra</p>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <FieldDescription>Help</FieldDescription>
          <Input aria-describedby="extra" />
        </Field>
      </>,
    )
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Extra Help')
  })

  it('calls the consumer onChange and submits its value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <form data-testid="form">
        <Input name="email" onChange={onChange} />
      </form>,
    )
    await user.type(screen.getByRole('textbox'), 'a@b.co')
    expect(onChange).toHaveBeenCalledTimes(6)
    expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('email')).toBe('a@b.co')
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <Field error>
        <FieldLabel>Name</FieldLabel>
        <Input />
        <FieldError>Required</FieldError>
      </Field>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
