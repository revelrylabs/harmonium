import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Progress} from './Progress'
import {configureAxe} from 'vitest-axe'
// jsdom has no layout, so colour contrast can't be computed here
const axe = configureAxe({rules: {'color-contrast': {enabled: false}}})


describe('Progress', () => {
  it('renders with progressbar role', () => {
    render(<Progress value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('sets aria attributes', () => {
    render(<Progress value={30} max={50} />)
    const el = screen.getByRole('progressbar')
    expect(el).toHaveAttribute('aria-valuenow', '30')
    expect(el).toHaveAttribute('aria-valuemax', '50')
  })

  it('clamps percentage between 0 and 100', () => {
    render(<Progress value={150} showLabel />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('shows label when showLabel is true', () => {
    render(<Progress value={75} showLabel />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('does not show label by default', () => {
    render(<Progress value={75} />)
    expect(screen.queryByText('75%')).not.toBeInTheDocument()
  })


  it('treats max={0} as an empty bar instead of NaN%', () => {
    const {container} = render(<Progress value={5} max={0} showLabel />)
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect((container.querySelector('.bar') as HTMLElement).style.width).toBe('0%')
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  })

  it('clamps aria-valuenow to the 0..max range', () => {
    const {rerender} = render(<Progress value={150} max={100} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
    rerender(<Progress value={-10} max={100} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  })

  it('renders the label outside the bar', () => {
    const {container} = render(<Progress value={75} showLabel />)
    const label = screen.getByText('75%')
    expect(label).toHaveClass('label')
    expect(container.querySelector('.bar')).not.toContainElement(label)
    expect(screen.getByRole('progressbar')).not.toContainElement(label)
  })

  it('has no axe violations', async () => {
    const {container} = render(<Progress value={40} showLabel aria-label="Upload" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
