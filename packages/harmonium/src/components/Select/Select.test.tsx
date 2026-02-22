import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Select} from './Select'

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
})
