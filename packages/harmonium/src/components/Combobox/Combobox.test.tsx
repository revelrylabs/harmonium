import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Combobox} from './Combobox'

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
})
