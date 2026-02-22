import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MultiSelect} from './MultiSelect'

const options = [
  {value: 'react', label: 'React'},
  {value: 'vue', label: 'Vue'},
  {value: 'angular', label: 'Angular'},
  {value: 'svelte', label: 'Svelte'},
]

describe('MultiSelect', () => {
  it('renders with placeholder', () => {
    render(<MultiSelect options={options} placeholder="Choose frameworks" />)
    expect(screen.getByPlaceholderText('Choose frameworks')).toBeInTheDocument()
  })

  it('shows options on focus', async () => {
    const user = userEvent.setup()
    render(<MultiSelect options={options} />)
    await user.click(screen.getByPlaceholderText('Select...'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })

  it('renders selected values as tags', () => {
    render(<MultiSelect options={options} value={['react', 'vue']} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('adds value on option click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<MultiSelect options={options} value={['react']} onChange={onChange} />)
    await user.click(screen.getByRole('textbox'))
    await user.click(screen.getByText('Vue'))
    expect(onChange).toHaveBeenCalledWith(['react', 'vue'])
  })

  it('removes value on tag remove click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<MultiSelect options={options} value={['react', 'vue']} onChange={onChange} />)
    await user.click(screen.getByLabelText('Remove React'))
    expect(onChange).toHaveBeenCalledWith(['vue'])
  })

  it('filters options by typing', async () => {
    const user = userEvent.setup()
    render(<MultiSelect options={options} value={[]} />)
    await user.click(screen.getByPlaceholderText('Select...'))
    await user.type(screen.getByRole('textbox'), 'sv')
    expect(screen.getAllByRole('option')).toHaveLength(1)
    expect(screen.getByText('Svelte')).toBeInTheDocument()
  })

  it('hides already selected options from dropdown', async () => {
    const user = userEvent.setup()
    render(<MultiSelect options={options} value={['react']} />)
    await user.click(screen.getByRole('textbox'))
    const optionLabels = screen.getAllByRole('option').map((el) => el.textContent)
    expect(optionLabels).not.toContain('React')
  })
})
