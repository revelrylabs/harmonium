import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Stat} from './Stat'

describe('Stat', () => {
  it('renders label and value', () => {
    render(<Stat label="Revenue" value="$12,400" />)
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$12,400')).toBeInTheDocument()
  })

  it('renders numeric value', () => {
    render(<Stat label="Users" value={1234} />)
    expect(screen.getByText('1234')).toBeInTheDocument()
  })

  it('renders change when provided', () => {
    render(<Stat label="Revenue" value="$12,400" change="+12%" trend="up" />)
    expect(screen.getByText('+12%')).toBeInTheDocument()
  })

  it('does not render change when not provided', () => {
    const {container} = render(<Stat label="Revenue" value="$12,400" />)
    expect(container.querySelector('[data-trend]')).not.toBeInTheDocument()
  })

  it('applies trend data attribute to change element', () => {
    const {container} = render(
      <Stat label="Revenue" value="$12,400" change="-3%" trend="down" />,
    )
    const changeEl = container.querySelector('[data-trend]')
    expect(changeEl).toHaveAttribute('data-trend', 'down')
  })

  it('defaults trend to neutral', () => {
    const {container} = render(
      <Stat label="Revenue" value="$12,400" change="0%" />,
    )
    const changeEl = container.querySelector('[data-trend]')
    expect(changeEl).toHaveAttribute('data-trend', 'neutral')
  })

  it('renders icon when provided', () => {
    render(
      <Stat
        label="Revenue"
        value="$12,400"
        icon={<span data-testid="icon">$</span>}
      />,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(
      <Stat
        data-testid="stat"
        label="Revenue"
        value="$12,400"
        className="custom"
      />,
    )
    expect(screen.getByTestId('stat')).toHaveClass('custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn<(el: HTMLDivElement | null) => void>()
    render(<Stat ref={ref} label="Revenue" value="$12,400" />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('renders up arrow for up trend', () => {
    render(<Stat label="Rev" value="$1" change="+5%" trend="up" />)
    expect(screen.getByText('+5%')).toBeInTheDocument()
  })

  it('renders down arrow for down trend', () => {
    render(<Stat label="Rev" value="$1" change="-2%" trend="down" />)
    expect(screen.getByText('-2%')).toBeInTheDocument()
  })
})
