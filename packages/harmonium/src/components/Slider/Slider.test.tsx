import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Slider} from './Slider'

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
})
