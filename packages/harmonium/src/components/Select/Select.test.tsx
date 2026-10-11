import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {Select} from './Select'

expect.extend(matchers)

describe('Select', () => {
  it('renders a select', () => {
    render(
      <Select aria-label="Color">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </Select>,
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders placeholder option', () => {
    render(
      <Select placeholder="Choose..." aria-label="Color">
        <option value="red">Red</option>
      </Select>,
    )
    expect(screen.getByText('Choose...')).toBeInTheDocument()
  })

  it('applies size', () => {
    render(<Select size="lg" aria-label="Size"><option>A</option></Select>)
    expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'lg')
  })

  it('shows the placeholder in uncontrolled use (#688)', () => {
    render(
      <Select placeholder="Choose..." aria-label="Color">
        <option value="red">Red</option>
      </Select>,
    )
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select).toHaveValue('')
    expect(select.selectedOptions[0]).toHaveTextContent('Choose...')
  })

  it('keeps an explicit defaultValue over the placeholder', () => {
    render(
      <Select placeholder="Choose..." defaultValue="blue" aria-label="Color">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </Select>,
    )
    expect(screen.getByRole('combobox')).toHaveValue('blue')
  })

  it('submits the picked option with a form', async () => {
    const user = userEvent.setup()
    render(
      <form data-testid="form">
        <Select name="color" placeholder="Choose..." aria-label="Color">
          <option value="red">Red</option>
        </Select>
      </form>,
    )
    const form = screen.getByTestId('form') as HTMLFormElement
    // Browsers skip a selected disabled option; jsdom submits ''.
    expect(new FormData(form).get('color') ?? '').toBe('')
    await user.selectOptions(screen.getByRole('combobox'), 'red')
    expect(new FormData(form).get('color')).toBe('red')
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <Select placeholder="Choose..." aria-label="Color">
        <option value="red">Red</option>
      </Select>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
