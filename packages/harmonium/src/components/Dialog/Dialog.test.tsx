import {describe, it, expect, vi} from 'vitest'
import {useState} from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import {Dialog, DialogHeader, DialogBody, DialogFooter} from './Dialog'
import {Drawer} from '../Drawer'

function Harness({onClose}: {onClose?: () => void}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open dialog</button>
      <Dialog
        open={open}
        onClose={() => {
          onClose?.()
          setOpen(false)
        }}
      >
        <DialogHeader>Edit profile</DialogHeader>
        <DialogBody>
          <input aria-label="Name" />
        </DialogBody>
        <DialogFooter>
          <button onClick={() => setOpen(false)}>Done</button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    render(<Dialog open={false}>Content</Dialog>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when open', () => {
    render(<Dialog open>Content</Dialog>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('has aria-modal attribute', () => {
    render(<Dialog open>Content</Dialog>)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('calls onClose on Escape key', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Dialog open onClose={onClose}>Content</Dialog>)
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose on overlay click', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Dialog open onClose={onClose}>Content</Dialog>)
    // The dialog renders in a portal, so the overlay is no longer inside the
    // render container.
    await user.click(document.querySelector('.overlay') as Element)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not call onClose when clicking dialog content', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Dialog open onClose={onClose}>Content</Dialog>)
    await user.click(screen.getByText('Content'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('keeps clicks inside working when the consumer passes onClick', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const onClick = vi.fn()
    render(
      <Dialog open onClose={onClose} onClick={onClick}>
        Content
      </Dialog>,
    )
    await user.click(screen.getByText('Content'))
    expect(onClick).toHaveBeenCalledOnce()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders with sections', () => {
    render(
      <Dialog open>
        <DialogHeader>Title</DialogHeader>
        <DialogBody>Body</DialogBody>
        <DialogFooter>Actions</DialogFooter>
      </Dialog>,
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('applies size', () => {
    render(<Dialog open size="lg">Content</Dialog>)
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'lg')
  })

  it('renders in a portal on document.body', () => {
    const {container} = render(<Dialog open>Content</Dialog>)
    expect(container).not.toContainElement(screen.getByRole('dialog'))
  })

  it('is labelled by DialogHeader', () => {
    render(
      <Dialog open>
        <DialogHeader>Edit profile</DialogHeader>
      </Dialog>,
    )
    expect(screen.getByRole('dialog', {name: 'Edit profile'})).toBeInTheDocument()
  })

  it('moves focus into the dialog and returns it to the trigger on close', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const trigger = screen.getByRole('button', {name: 'Open dialog'})
    await user.click(trigger)
    await waitFor(() => expect(screen.getByLabelText('Name')).toHaveFocus())

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('traps focus inside the dialog', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', {name: 'Open dialog'}))
    await waitFor(() => expect(screen.getByLabelText('Name')).toHaveFocus())
    await user.tab()
    expect(screen.getByRole('button', {name: 'Done'})).toHaveFocus()
    // Tabbing past the last element lands on a focus guard that wraps around.
    await user.tab()
    await waitFor(() => expect(screen.getByLabelText('Name')).toHaveFocus())
  })

  it('closes only the topmost overlay on Escape', async () => {
    const user = userEvent.setup()
    const onDialogClose = vi.fn()
    const onDrawerClose = vi.fn()
    render(
      <Dialog open onClose={onDialogClose}>
        <DialogHeader>Dialog</DialogHeader>
        <Drawer open onClose={onDrawerClose}>
          <button>In drawer</button>
        </Drawer>
      </Dialog>,
    )
    await user.keyboard('{Escape}')
    expect(onDrawerClose).toHaveBeenCalledOnce()
    expect(onDialogClose).not.toHaveBeenCalled()
  })

  it('has no axe violations', async () => {
    render(
      <Dialog open>
        <DialogHeader>Edit profile</DialogHeader>
        <DialogBody>Body</DialogBody>
        <DialogFooter>
          <button>Save</button>
        </DialogFooter>
      </Dialog>,
    )
    expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations()
  })
})
