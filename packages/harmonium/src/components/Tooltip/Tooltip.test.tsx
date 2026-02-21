import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Tooltip} from './Tooltip'

describe('Tooltip', () => {
  it('does not show tooltip by default', () => {
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>)
    await user.hover(screen.getByText('Hover me'))
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help text')
  })

  it('hides tooltip on unhover', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>)
    await user.hover(screen.getByText('Hover me'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    await user.unhover(screen.getByText('Hover me'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('applies side data attribute', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Help" side="bottom"><button>Hover</button></Tooltip>)
    await user.hover(screen.getByText('Hover'))
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-side', 'bottom')
  })
})
