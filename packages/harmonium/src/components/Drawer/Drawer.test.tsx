import {describe, it, expect, vi} from 'vitest'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import {Drawer} from './Drawer'
import {DialogHeader} from '../Dialog'

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(<Drawer open={false}>Content</Drawer>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when open', () => {
    render(<Drawer open>Content</Drawer>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('defaults to right side', () => {
    render(<Drawer open>Content</Drawer>)
    expect(screen.getByRole('dialog')).toHaveAttribute('data-side', 'right')
  })

  it('supports left side', () => {
    render(<Drawer open side="left">Content</Drawer>)
    expect(screen.getByRole('dialog')).toHaveAttribute('data-side', 'left')
  })

  it('calls onClose on Escape', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Drawer open onClose={onClose}>Content</Drawer>)
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose on overlay click', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Drawer open onClose={onClose}>Content</Drawer>)
    // The drawer renders in a portal, so the overlay is no longer inside the
    // render container.
    await user.click(document.querySelector('.overlay') as Element)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('applies size', () => {
    render(<Drawer open size="lg">Content</Drawer>)
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'lg')
  })

  it('moves focus into the drawer and returns it on close', async () => {
    const {rerender} = render(
      <>
        <button>Menu</button>
        <Drawer open={false}>
          <button>Close</button>
        </Drawer>
      </>,
    )
    const trigger = screen.getByRole('button', {name: 'Menu'})
    trigger.focus()
    rerender(
      <>
        <button>Menu</button>
        <Drawer open>
          <button>Close</button>
        </Drawer>
      </>,
    )
    await waitFor(() => expect(screen.getByRole('button', {name: 'Close'})).toHaveFocus())
    rerender(
      <>
        <button>Menu</button>
        <Drawer open={false}>
          <button>Close</button>
        </Drawer>
      </>,
    )
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('is labelled by a DialogHeader inside it', () => {
    render(
      <Drawer open>
        <DialogHeader>Navigation</DialogHeader>
      </Drawer>,
    )
    expect(screen.getByRole('dialog', {name: 'Navigation'})).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    render(
      <Drawer open>
        <DialogHeader>Navigation</DialogHeader>
        <button>Close</button>
      </Drawer>,
    )
    expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations()
  })
})
