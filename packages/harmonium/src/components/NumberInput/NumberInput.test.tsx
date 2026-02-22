import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {NumberInput} from './NumberInput'

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
    const user = userEvent.setup()
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
})
