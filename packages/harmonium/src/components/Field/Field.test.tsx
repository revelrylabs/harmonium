import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Field, FieldLabel, FieldDescription, FieldError} from './Field'

describe('Field', () => {
  it('renders label connected to field via htmlFor', () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
      </Field>,
    )
    const label = screen.getByText('Email')
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('for')
  })

  it('renders description', () => {
    render(
      <Field>
        <FieldDescription>Enter your email</FieldDescription>
      </Field>,
    )
    expect(screen.getByText('Enter your email')).toBeInTheDocument()
  })

  it('renders error with alert role', () => {
    render(
      <Field error>
        <FieldError>Required field</FieldError>
      </Field>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Required field')
  })

  it('applies error data attribute', () => {
    render(<Field data-testid="field" error><FieldLabel>Name</FieldLabel></Field>)
    expect(screen.getByTestId('field')).toHaveAttribute('data-error')
  })
})
