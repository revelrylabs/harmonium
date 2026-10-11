import {describe, it, expect, vi} from 'vitest'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import type {AxeMatchers} from 'vitest-axe/matchers'
import {Field, FieldDescription, FieldLabel} from '../Field'
import {MultiSelect} from './MultiSelect'

expect.extend(matchers)

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion extends AxeMatchers {}
}

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
    await user.click(screen.getByRole('combobox'))
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
    await user.type(screen.getByRole('combobox'), 'sv')
    expect(screen.getAllByRole('option')).toHaveLength(1)
    expect(screen.getByText('Svelte')).toBeInTheDocument()
  })

  it('hides already selected options from dropdown', async () => {
    const user = userEvent.setup()
    render(<MultiSelect options={options} value={['react']} />)
    await user.click(screen.getByRole('combobox'))
    const optionLabels = screen.getAllByRole('option').map((el) => el.textContent)
    expect(optionLabels).not.toContain('React')
  })

  it('works uncontrolled with defaultValue', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <MultiSelect options={options} defaultValue={['react']} onChange={onChange} />,
    )
    expect(screen.getByText('React')).toBeInTheDocument()
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', {name: 'Vue'}))
    expect(onChange).toHaveBeenLastCalledWith(['react', 'vue'])
    expect(screen.getByLabelText('Remove Vue')).toBeInTheDocument()
    await user.click(screen.getByLabelText('Remove React'))
    expect(onChange).toHaveBeenLastCalledWith(['vue'])
    expect(screen.queryByLabelText('Remove React')).not.toBeInTheDocument()
  })

  it('clears the query after adding an option', async () => {
    const user = userEvent.setup()
    render(<MultiSelect options={options} />)
    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.type(input, 'sv')
    await user.click(screen.getByRole('option', {name: 'Svelte'}))
    expect(input).toHaveValue('')
    expect(input).toHaveFocus()
  })

  it('selects with the keyboard and exposes the combobox pattern', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<MultiSelect options={options} onChange={onChange} />)
    const input = screen.getByRole('combobox')
    input.focus()
    expect(input).toHaveAttribute('aria-expanded', 'false')
    await user.keyboard('{ArrowDown}')
    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('listbox')).toHaveAttribute(
      'aria-multiselectable',
      'true',
    )
    await user.keyboard('{ArrowDown}')
    const active = input.getAttribute('aria-activedescendant')
    expect(document.getElementById(active ?? '')).toHaveTextContent('Vue')
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenLastCalledWith(['vue'])
  })

  it('removes the last tag with Backspace on an empty input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<MultiSelect options={options} defaultValue={['react', 'vue']} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('{Backspace}')
    expect(onChange).toHaveBeenLastCalledWith(['react'])
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<MultiSelect options={options} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('does not close a list reopened within 200ms of blurring', async () => {
    vi.useFakeTimers({shouldAdvanceTime: true})
    try {
      const user = userEvent.setup({advanceTimers: vi.advanceTimersByTime})
      render(
        <>
          <MultiSelect options={options} />
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
      <Field error>
        <FieldLabel>Frameworks</FieldLabel>
        <FieldDescription>Pick any</FieldDescription>
        <MultiSelect options={options} />
      </Field>,
    )
    const input = screen.getByRole('combobox', {name: 'Frameworks'})
    expect(input).toHaveAccessibleDescription('Pick any')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('marks the root disabled and merges consumer props', () => {
    const {container} = render(
      <MultiSelect options={options} disabled className="custom" data-testid="ms" />,
    )
    const root = container.firstChild
    expect(root).toHaveClass('root', 'custom')
    expect(root).toHaveAttribute('data-disabled')
    expect(screen.getByTestId('ms')).toBe(root)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('has no axe violations closed or open', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <Field>
        <FieldLabel>Frameworks</FieldLabel>
        <MultiSelect options={options} defaultValue={['react']} />
      </Field>,
    )
    expect(await axe(container)).toHaveNoViolations()
    await user.click(screen.getByRole('combobox'))
    // See the matching Combobox test: while open, Base UI aria-hides the
    // <label> (the name is still computed from it per accname), so axe's
    // label rules are checked in the closed state above.
    expect(
      await axe(container, {
        rules: {label: {enabled: false}, 'label-title-only': {enabled: false}},
      }),
    ).toHaveNoViolations()
  })
})
