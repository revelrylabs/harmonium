import * as React from 'react'
import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {Radio, RadioGroup} from './Radio'

expect.extend(matchers)

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

  it('names the group by its legend and each radio by its label', () => {
    render(
      <RadioGroup legend="Color">
        <Radio value="red" label="Red" />
      </RadioGroup>,
    )
    expect(screen.getByRole('radiogroup', {name: 'Color'})).toBeInTheDocument()
    expect(screen.getByRole('radio', {name: 'Red'})).toBeInTheDocument()
  })

  it('submits the selected value under the radios name', async () => {
    const user = userEvent.setup()
    render(
      <form data-testid="form">
        <RadioGroup legend="Color">
          <Radio name="color" value="red" label="Red" />
          <Radio name="color" value="blue" label="Blue" defaultChecked />
        </RadioGroup>
      </form>,
    )
    const form = screen.getByTestId('form') as HTMLFormElement
    expect(new FormData(form).get('color')).toBe('blue')
    await user.click(screen.getByRole('radio', {name: 'Red'}))
    expect(new FormData(form).get('color')).toBe('red')
  })

  it('accepts name, value and onValueChange on the group', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    function Controlled() {
      const [value, setValue] = React.useState('s')
      return (
        <form data-testid="form">
          <RadioGroup
            legend="Size"
            name="size"
            value={value}
            onValueChange={(next) => {
              onValueChange(next)
              setValue(next)
            }}
          >
            <Radio value="s" label="Small" />
            <Radio value="l" label="Large" />
          </RadioGroup>
        </form>
      )
    }
    render(<Controlled />)
    expect(screen.getByRole('radio', {name: 'Small'})).toBeChecked()
    await user.click(screen.getByRole('radio', {name: 'Large'}))
    expect(onValueChange).toHaveBeenCalledWith('l')
    expect(screen.getByRole('radio', {name: 'Large'})).toBeChecked()
    expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('size')).toBe('l')
  })

  it('supports per-radio checked and onChange', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [color, setColor] = React.useState('red')
      return (
        <RadioGroup>
          {['red', 'blue'].map((c) => (
            <Radio
              key={c}
              name="color"
              value={c}
              label={c}
              checked={color === c}
              onChange={(event) => setColor(event.target.value)}
            />
          ))}
        </RadioGroup>
      )
    }
    render(<Controlled />)
    expect(screen.getByRole('radio', {name: 'red'})).toBeChecked()
    await user.click(screen.getByRole('radio', {name: 'blue'}))
    expect(screen.getByRole('radio', {name: 'blue'})).toBeChecked()
    expect(screen.getByRole('radio', {name: 'red'})).not.toBeChecked()
  })

  it('moves the selection with arrow keys', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup legend="Color">
        <Radio value="red" label="Red" />
        <Radio value="blue" label="Blue" />
      </RadioGroup>,
    )
    await user.click(screen.getByRole('radio', {name: 'Red'}))
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('radio', {name: 'Blue'})).toBeChecked()
  })

  it('disables every radio from the group', () => {
    render(
      <RadioGroup legend="Color" disabled>
        <Radio value="red" label="Red" />
      </RadioGroup>,
    )
    expect(screen.getByRole('radio')).toHaveAttribute('aria-disabled', 'true')
  })

  it('puts className and style on the visible wrapper', () => {
    render(
      <RadioGroup>
        <Radio value="a" label="Styled" className="custom" style={{marginTop: 8}} />
      </RadioGroup>,
    )
    const wrapper = screen.getByText('Styled').closest('label')
    expect(wrapper).toHaveClass('custom')
    expect(wrapper).toHaveStyle({marginTop: '8px'})
  })

  it('falls back to a native radio outside a RadioGroup', () => {
    render(<Radio name="solo" value="x" label="Solo" defaultChecked />)
    const radio = screen.getByRole('radio', {name: 'Solo'})
    expect(radio.tagName).toBe('INPUT')
    expect(radio).toBeChecked()
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <RadioGroup legend="Color">
        <Radio name="color" value="red" label="Red" />
        <Radio name="color" value="blue" label="Blue" />
      </RadioGroup>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
