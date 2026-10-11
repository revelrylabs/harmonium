import * as React from 'react'
import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {NumberInput} from './NumberInput'

expect.extend(matchers)

describe('NumberInput', () => {
  it('renders a number input with buttons', () => {
    render(<NumberInput aria-label="Quantity" />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    expect(screen.getByLabelText('Decrease')).toBeInTheDocument()
    expect(screen.getByLabelText('Increase')).toBeInTheDocument()
  })

  it('increments on plus click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput defaultValue={5} onChange={onChange} aria-label="Qty" />)
    await user.click(screen.getByLabelText('Increase'))
    expect(onChange).toHaveBeenCalledWith(6)
  })

  it('decrements on minus click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput defaultValue={5} onChange={onChange} aria-label="Qty" />)
    await user.click(screen.getByLabelText('Decrease'))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('respects min boundary', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput defaultValue={0} min={0} onChange={onChange} aria-label="Qty" />)
    expect(screen.getByLabelText('Decrease')).toBeDisabled()
    await user.click(screen.getByLabelText('Decrease'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('respects max boundary', async () => {
    const onChange = vi.fn()
    render(<NumberInput defaultValue={10} max={10} onChange={onChange} aria-label="Qty" />)
    expect(screen.getByLabelText('Increase')).toBeDisabled()
  })

  it('uses custom step', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput defaultValue={0} step={5} onChange={onChange} aria-label="Qty" />)
    await user.click(screen.getByLabelText('Increase'))
    expect(onChange).toHaveBeenCalledWith(5)
  })

  it('does not clamp while typing, only on blur (#686)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput defaultValue={10} min={10} max={20} onChange={onChange} aria-label="Qty" />)
    const input = screen.getByRole('spinbutton')
    await user.clear(input)
    await user.type(input, '15')
    expect(input).toHaveValue('15')
    expect(onChange).toHaveBeenLastCalledWith(15)
    expect(onChange).toHaveBeenCalledWith(1)

    await user.clear(input)
    await user.type(input, '5')
    expect(input).toHaveValue('5')
    expect(onChange).toHaveBeenLastCalledWith(5)
    await user.tab()
    expect(onChange).toHaveBeenLastCalledWith(10)
    expect(input).toHaveValue('10')
  })

  it('clamps when Enter is pressed', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput defaultValue={5} max={20} onChange={onChange} aria-label="Qty" />)
    const input = screen.getByRole('spinbutton')
    await user.clear(input)
    await user.type(input, '99{Enter}')
    expect(onChange).toHaveBeenLastCalledWith(20)
    expect(input).toHaveValue('20')
    expect(input).toHaveFocus()
  })

  it('does not call onChange when cleared', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput defaultValue={5} onChange={onChange} aria-label="Qty" />)
    const input = screen.getByRole('spinbutton')
    await user.clear(input)
    await user.tab()
    expect(onChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('')
  })

  it('supports controlled use', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [value, setValue] = React.useState(3)
      return (
        <>
          <NumberInput value={value} onChange={setValue} aria-label="Qty" />
          <output data-testid="out">{value}</output>
        </>
      )
    }
    render(<Controlled />)
    await user.click(screen.getByLabelText('Increase'))
    expect(screen.getByTestId('out')).toHaveTextContent('4')
    const input = screen.getByRole('spinbutton')
    await user.clear(input)
    await user.type(input, '42')
    expect(screen.getByTestId('out')).toHaveTextContent('42')
    expect(input).toHaveValue('42')
  })

  it('rounds stepping to the step precision (#739)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput defaultValue={0} step={0.1} onChange={onChange} aria-label="Qty" />)
    const increase = screen.getByLabelText('Increase')
    await user.click(increase)
    await user.click(increase)
    await user.click(increase)
    expect(onChange).toHaveBeenLastCalledWith(0.3)
    expect(screen.getByRole('spinbutton')).toHaveValue('0.3')
  })

  it('steps with the arrow keys', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput defaultValue={1} onChange={onChange} aria-label="Qty" />)
    screen.getByRole('spinbutton').focus()
    await user.keyboard('{ArrowUp}')
    expect(onChange).toHaveBeenLastCalledWith(2)
  })

  it('passes disabled to the stepper buttons (#686)', () => {
    render(<NumberInput disabled aria-label="Qty" />)
    expect(screen.getByRole('spinbutton')).toBeDisabled()
    expect(screen.getByLabelText('Decrease')).toBeDisabled()
    expect(screen.getByLabelText('Increase')).toBeDisabled()
  })

  it('disables the stepper buttons when readOnly', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput readOnly defaultValue={1} onChange={onChange} aria-label="Qty" />)
    expect(screen.getByLabelText('Decrease')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByLabelText('Increase')).toHaveAttribute('aria-disabled', 'true')
    await user.click(screen.getByLabelText('Increase'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('lets the button labels be overridden', () => {
    render(<NumberInput decrementLabel="Fewer" incrementLabel="More" aria-label="Qty" />)
    expect(screen.getByRole('button', {name: 'Fewer'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'More'})).toBeInTheDocument()
  })

  it('submits name and value with a form', async () => {
    const user = userEvent.setup()
    render(
      <form data-testid="form">
        <NumberInput name="qty" defaultValue={2} aria-label="Qty" />
      </form>,
    )
    const form = screen.getByTestId('form') as HTMLFormElement
    expect(new FormData(form).get('qty')).toBe('2')
    await user.click(screen.getByLabelText('Increase'))
    expect(new FormData(form).get('qty')).toBe('3')
  })

  it('keeps size and className on the root', () => {
    const {container} = render(<NumberInput size="sm" className="custom" aria-label="Qty" />)
    const root = container.firstElementChild
    expect(root).toHaveClass('root', 'custom')
    expect(root).toHaveAttribute('data-size', 'sm')
  })

  it('has no axe violations', async () => {
    const {container} = render(<NumberInput aria-label="Quantity" min={0} max={10} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
