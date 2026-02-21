import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Progress} from './Progress'

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
})
