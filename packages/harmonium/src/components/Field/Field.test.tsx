import * as React from 'react'
import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {Field, FieldLabel, FieldDescription, FieldError, useFieldContext} from './Field'
import {Input} from '../Input'
import {Textarea} from '../Textarea'
import {Select} from '../Select'
import {DatePicker} from '../DatePicker'
import {TimePicker} from '../TimePicker'
import {NumberInput} from '../NumberInput'
import {Checkbox} from '../Checkbox'
import {Switch} from '../Switch'
import {Slider} from '../Slider'
import {Radio, RadioGroup} from '../Radio'

expect.extend(matchers)

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

  it('only references parts that are rendered', () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input />
      </Field>,
    )
    expect(screen.getByRole('textbox', {name: 'Email'})).not.toHaveAttribute('aria-describedby')
  })

  it('describes the control with the description and the error', () => {
    render(
      <Field error>
        <FieldLabel>Email</FieldLabel>
        <FieldDescription>We will not share it</FieldDescription>
        <Input />
        <FieldError>Required</FieldError>
      </Field>,
    )
    const input = screen.getByRole('textbox', {name: 'Email'})
    expect(input).toHaveAccessibleDescription("We will not share it Required")
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-errormessage', screen.getByRole('alert').id)
  })

  it('renders nothing for an empty FieldError', () => {
    render(
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input />
        <FieldError>{undefined}</FieldError>
      </Field>,
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby')
  })

  it('keeps FieldError a <p>', () => {
    render(
      <Field error>
        <FieldError>Required</FieldError>
      </Field>,
    )
    expect(screen.getByRole('alert').tagName).toBe('P')
  })

  it('exposes the rendered parts through useFieldContext', () => {
    function Custom() {
      const ctx = useFieldContext()
      return (
        <input
          id={ctx?.fieldId}
          aria-describedby={ctx?.describedBy}
          aria-invalid={ctx?.error || undefined}
        />
      )
    }
    const {rerender} = render(
      <Field>
        <FieldLabel>Custom</FieldLabel>
        <Custom />
      </Field>,
    )
    const input = screen.getByRole('textbox', {name: 'Custom'})
    expect(input).not.toHaveAttribute('aria-describedby')

    rerender(
      <Field error>
        <FieldLabel>Custom</FieldLabel>
        <FieldDescription>Help</FieldDescription>
        <Custom />
        <FieldError>Wrong</FieldError>
      </Field>,
    )
    const described = screen.getByRole('textbox', {name: 'Custom'})
    expect(described).toHaveAccessibleDescription('Help Wrong')
    expect(described).toHaveAttribute('aria-invalid', 'true')
  })

  it('returns null from useFieldContext outside a Field', () => {
    let ctx: ReturnType<typeof useFieldContext> = undefined as never
    function Probe() {
      ctx = useFieldContext()
      return null
    }
    render(<Probe />)
    expect(ctx).toBeNull()
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <Field error>
        <FieldLabel>Email</FieldLabel>
        <FieldDescription>We will not share it</FieldDescription>
        <Input type="email" />
        <FieldError>Required</FieldError>
      </Field>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

const controls: Array<{
  name: string
  control: React.ReactElement
  get: () => HTMLElement
}> = [
  {name: 'Input', control: <Input />, get: () => screen.getByRole('textbox', {name: 'Label'})},
  {
    name: 'Textarea',
    control: <Textarea />,
    get: () => screen.getByRole('textbox', {name: 'Label'}),
  },
  {
    name: 'Select',
    control: (
      <Select placeholder="Pick one">
        <option value="a">A</option>
      </Select>
    ),
    get: () => screen.getByRole('combobox', {name: 'Label'}),
  },
  {name: 'DatePicker', control: <DatePicker />, get: () => screen.getByLabelText('Label')},
  {name: 'TimePicker', control: <TimePicker />, get: () => screen.getByLabelText('Label')},
  {
    name: 'NumberInput',
    control: <NumberInput />,
    get: () => screen.getByRole('spinbutton', {name: 'Label'}),
  },
  {
    name: 'Checkbox',
    control: <Checkbox />,
    get: () => screen.getByRole('checkbox', {name: 'Label'}),
  },
  {name: 'Switch', control: <Switch />, get: () => screen.getByRole('switch', {name: 'Label'})},
  {name: 'Slider', control: <Slider />, get: () => screen.getByRole('slider', {name: 'Label'})},
  {
    name: 'RadioGroup',
    control: (
      <RadioGroup>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>
    ),
    get: () => screen.getByRole('radiogroup', {name: 'Label'}),
  },
]

describe.each(controls)('Field wiring: $name', ({control, get}) => {
  it('is labelled by FieldLabel and not described by missing parts', () => {
    render(
      <Field>
        <FieldLabel>Label</FieldLabel>
        {control}
      </Field>,
    )
    const el = get()
    expect(el).not.toHaveAttribute('aria-invalid')
    const target = document.getElementById(screen.getByText('Label').getAttribute('for') ?? '')
    expect(target === el || el.contains(target) || target?.closest('label')?.contains(el)).toBe(true)
    for (const id of (el.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean)) {
      expect(document.getElementById(id)).not.toBeNull()
    }
    expect(el).toHaveAccessibleDescription('')
  })

  it('is described by FieldDescription and FieldError, and invalid on error', () => {
    render(
      <Field error>
        <FieldLabel>Label</FieldLabel>
        <FieldDescription>Help text</FieldDescription>
        {control}
        <FieldError>Error text</FieldError>
      </Field>,
    )
    const el = get()
    expect(el).toHaveAccessibleDescription('Help text Error text')
    expect(el).toHaveAttribute('aria-invalid', 'true')
  })
})
