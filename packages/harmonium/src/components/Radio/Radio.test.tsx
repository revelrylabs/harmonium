import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Radio, RadioGroup} from './Radio'

describe('Radio', () => {
  it('renders radio buttons', () => {
    render(
      <RadioGroup legend="Color">
        <Radio name="color" value="red" label="Red" />
        <Radio name="color" value="blue" label="Blue" />
      </RadioGroup>,
    )
    expect(screen.getAllByRole('radio')).toHaveLength(2)
    expect(screen.getByText('Color')).toBeInTheDocument()
  })

  it('selects on click', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup>
        <Radio name="color" value="red" label="Red" />
        <Radio name="color" value="blue" label="Blue" />
      </RadioGroup>,
    )
    await user.click(screen.getByText('Red'))
    expect(screen.getAllByRole('radio')[0]).toBeChecked()
    expect(screen.getAllByRole('radio')[1]).not.toBeChecked()
  })
})
