import {describe, it, expect, vi} from 'vitest'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import type {AxeMatchers} from 'vitest-axe/matchers'
import {Field, FieldDescription, FieldLabel} from '../Field'
import {Combobox} from './Combobox'

expect.extend(matchers)

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion extends AxeMatchers {}
}

const options = [
  {value: 'apple', label: 'Apple'},
  {value: 'banana', label: 'Banana'},
  {value: 'cherry', label: 'Cherry'},
]

describe('Combobox', () => {
  it('renders combobox input', () => {
    render(<Combobox options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('opens dropdown on focus', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('filters options by typing', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} />)
    await user.click(screen.getByRole('combobox'))
    await user.type(screen.getByRole('combobox'), 'ban')
    expect(screen.getAllByRole('option')).toHaveLength(1)
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('shows no results message', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} />)
    await user.click(screen.getByRole('combobox'))
    await user.type(screen.getByRole('combobox'), 'xyz')
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('selects option on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Combobox options={options} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByText('Banana'))
    expect(onChange).toHaveBeenCalledWith('banana')
  })

  it('shows selected label in input', () => {
    render(<Combobox options={options} value="cherry" />)
    expect(screen.getByRole('combobox')).toHaveValue('Cherry')
  })

  it('navigates with keyboard', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Combobox options={options} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}')
    expect(onChange).toHaveBeenCalledWith('banana')
  })

  it('works uncontrolled with defaultValue', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Combobox options={options} defaultValue="apple" onChange={onChange} />)
    const input = screen.getByRole('combobox')
    expect(input).toHaveValue('Apple')
    await user.click(input)
    await user.click(screen.getByRole('option', {name: 'Cherry'}))
    expect(onChange).toHaveBeenCalledWith('cherry')
    expect(input).toHaveValue('Cherry')
  })

  it('keeps the selection visible when focused', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} defaultValue="banana" />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveValue('Banana')
  })

  it('exposes the combobox pattern to assistive tech', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} />)
    const input = screen.getByRole('combobox')
    expect(input).toHaveAttribute('aria-expanded', 'false')
    await user.click(input)
    expect(input).toHaveAttribute('aria-expanded', 'true')
    const listbox = screen.getByRole('listbox')
    expect(input).toHaveAttribute('aria-controls', listbox.id)
    await user.keyboard('{ArrowDown}')
    const active = input.getAttribute('aria-activedescendant')
    expect(active).toBeTruthy()
    expect(document.getElementById(active ?? '')).toHaveTextContent('Apple')
    expect(screen.getByRole('option', {name: 'Apple'})).toHaveAttribute(
      'data-highlighted',
    )
  })

  it('opens with ArrowDown, moves with arrows and selects with Enter', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Combobox options={options} onChange={onChange} />)
    screen.getByRole('combobox').focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowUp}{Enter}')
    expect(onChange).toHaveBeenCalledWith('banana')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveValue('Banana')
  })

  it('closes on Escape without selecting', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Combobox options={options} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('{ArrowDown}{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not close a list reopened within 200ms of blurring', async () => {
    vi.useFakeTimers({shouldAdvanceTime: true})
    try {
      const user = userEvent.setup({advanceTimers: vi.advanceTimersByTime})
      render(
        <>
          <Combobox options={options} />
          <button type="button">Other</button>
        </>,
      )
      const input = screen.getByRole('combobox')
      await user.click(input)
      await user.tab()
      await user.click(input)
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      await act(async () => {
        vi.advanceTimersByTime(250)
      })
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it('is labelled and described by Field', () => {
    render(
      <Field>
        <FieldLabel>Fruit</FieldLabel>
        <FieldDescription>Pick one</FieldDescription>
        <Combobox options={options} />
      </Field>,
    )
    const input = screen.getByRole('combobox', {name: 'Fruit'})
    expect(input).toHaveAccessibleDescription('Pick one')
  })

  it('marks the input invalid inside an errored Field', () => {
    render(
      <Field error>
        <FieldLabel>Fruit</FieldLabel>
        <Combobox options={options} />
      </Field>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('merges consumer props onto the root', () => {
    const {container} = render(
      <Combobox options={options} className="custom" data-testid="cb" />,
    )
    expect(container.firstChild).toHaveClass('root', 'custom')
    expect(screen.getByTestId('cb')).toBe(container.firstChild)
  })

  it('has no axe violations closed or open', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <Field>
        <FieldLabel>Fruit</FieldLabel>
        <FieldDescription>Pick one</FieldDescription>
        <Combobox options={options} />
      </Field>,
    )
    expect(await axe(container)).toHaveNoViolations()
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('{ArrowDown}')
    // While open, Base UI hides everything outside the combobox and its popup
    // from assistive tech, including the <label> (the name is still computed
    // from it per accname). axe's label rules are checked closed above.
    expect(
      await axe(container, {
        rules: {label: {enabled: false}, 'label-title-only': {enabled: false}},
      }),
    ).toHaveNoViolations()
  })
})
