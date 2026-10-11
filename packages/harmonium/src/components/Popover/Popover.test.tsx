import {describe, it, expect, vi, beforeAll} from 'vitest'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import {Popover} from './Popover'
import {Button} from '../Button'

beforeAll(() => {
  // jsdom reports a 0x0 viewport, which makes Base UI flip every popup to
  // the opposite side. Give it a real size.
  Object.defineProperty(document.documentElement, 'clientWidth', {value: 1024, configurable: true})
  Object.defineProperty(document.documentElement, 'clientHeight', {value: 768, configurable: true})
})

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

  it('makes the child the trigger: one tab stop, no wrapping role="button"', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <Popover content="Details">
        <Button>Options</Button>
      </Popover>,
    )
    expect(container.querySelector('[role="button"]')).toBeNull()
    await user.tab()
    const trigger = screen.getByRole('button', {name: 'Options'})
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.tab()
    expect(document.body).toHaveFocus()
  })

  it('points aria-controls at the open popup and labels it by the trigger', async () => {
    const user = userEvent.setup()
    render(
      <Popover content="Details">
        <Button>Options</Button>
      </Popover>,
    )
    const trigger = screen.getByRole('button', {name: 'Options'})
    await user.click(trigger)
    const popup = screen.getByRole('dialog', {name: 'Options'})
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).toHaveAttribute('aria-controls', popup.id)
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Popover content={<a href="#x">Link</a>} onOpenChange={onOpenChange}>
        <Button>Options</Button>
      </Popover>,
    )
    const trigger = screen.getByRole('button', {name: 'Options'})
    await user.click(trigger)
    expect(onOpenChange).toHaveBeenLastCalledWith(true)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('keeps the child onClick working', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Popover content="Details">
        <Button onClick={onClick}>Options</Button>
      </Popover>,
    )
    await user.click(screen.getByRole('button', {name: 'Options'}))
    expect(onClick).toHaveBeenCalledOnce()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('supports controlled open', () => {
    render(
      <Popover content="Details" open>
        <Button>Options</Button>
      </Popover>,
    )
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <Popover content="Details">
        <Button>Options</Button>
      </Popover>,
    )
    await user.click(screen.getByRole('button', {name: 'Options'}))
    // Let the open transition settle so axe sees the final DOM.
    await waitFor(() =>
      expect(screen.getByRole('dialog')).not.toHaveAttribute('data-starting-style'),
    )
    expect(await axe(container)).toHaveNoViolations()
    expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations()
  })
})
