import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Popover} from './Popover'

describe('Popover', () => {
  it('does not show content by default', () => {
    render(<Popover content="Details"><button>Open</button></Popover>)
    expect(screen.queryByText('Details')).not.toBeInTheDocument()
  })

  it('shows content on click', async () => {
    const user = userEvent.setup()
    render(<Popover content="Details"><button>Open</button></Popover>)
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('hides on second click (toggle)', async () => {
    const user = userEvent.setup()
    render(<Popover content="Details"><button>Open</button></Popover>)
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Details')).toBeInTheDocument()
    await user.click(screen.getByText('Open'))
    expect(screen.queryByText('Details')).not.toBeInTheDocument()
  })

  it('applies side data attribute', async () => {
    const user = userEvent.setup()
    render(<Popover content="Details" side="right"><button>Open</button></Popover>)
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Details')).toHaveAttribute('data-side', 'right')
  })
})
