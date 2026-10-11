import * as React from 'react'
import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {Slider} from './Slider'

expect.extend(matchers)

describe('Slider', () => {
  it('renders a range input', () => {
    render(<Slider aria-label="Volume" />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('shows value when showValue is true', () => {
    render(<Slider showValue defaultValue={75} aria-label="Volume" />)
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('accepts min, max, step', () => {
    render(<Slider min={0} max={200} step={10} aria-label="Volume" />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '200')
    expect(slider).toHaveAttribute('step', '10')
  })

  it('starts at the midpoint of min/max and shows it (#739)', () => {
    render(<Slider min={0} max={10} showValue aria-label="Volume" />)
    expect(screen.getByRole('slider')).toHaveValue('5')
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('aligns the default value to the step, like a native range', () => {
    render(<Slider min={0} max={10} step={4} showValue aria-label="Volume" />)
    expect(screen.getByRole('slider')).toHaveValue('4')
  })

  it('renders the value in an <output> linked to the input', () => {
    render(<Slider showValue defaultValue={30} aria-label="Volume" />)
    const output = screen.getByText('30')
    expect(output.tagName).toBe('OUTPUT')
    expect(output).toHaveAttribute('for', screen.getByRole('slider').id)
  })

  it('changes with the keyboard and reports a change event', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => event.target.value)
    render(<Slider defaultValue={50} showValue onChange={onChange} aria-label="Volume" />)
    screen.getByRole('slider').focus()
    await user.keyboard('{ArrowRight}')
    expect(onChange).toHaveReturnedWith('51')
    expect(screen.getByText('51')).toBeInTheDocument()
  })

  it('supports controlled use', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [value, setValue] = React.useState(20)
      return (
        <Slider
          value={value}
          step={5}
          showValue
          onChange={(event) => setValue(Number(event.target.value))}
          aria-label="Volume"
        />
      )
    }
    render(<Controlled />)
    screen.getByRole('slider').focus()
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('slider')).toHaveValue('15')
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('submits name and value with a form', () => {
    render(
      <form data-testid="form">
        <Slider name="volume" defaultValue={30} aria-label="Volume" />
      </form>,
    )
    const form = screen.getByTestId('form') as HTMLFormElement
    expect(new FormData(form).get('volume')).toBe('30')
  })

  it('keeps size and className on the root', () => {
    const {container} = render(<Slider size="lg" className="custom" aria-label="Volume" />)
    const root = container.firstElementChild
    expect(root).toHaveClass('root', 'custom')
    expect(root).toHaveAttribute('data-size', 'lg')
  })

  it('disables the input', () => {
    render(<Slider disabled aria-label="Volume" />)
    expect(screen.getByRole('slider')).toBeDisabled()
  })

  it('has no axe violations', async () => {
    const {container} = render(<Slider showValue aria-label="Volume" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
