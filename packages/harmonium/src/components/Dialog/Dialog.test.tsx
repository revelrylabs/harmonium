import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Dialog, DialogHeader, DialogBody, DialogFooter} from './Dialog'

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
    const {container} = render(<Dialog open onClose={onClose}>Content</Dialog>)
    // Click the overlay (first child of container)
    await user.click(container.firstChild as Element)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not call onClose when clicking dialog content', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Dialog open onClose={onClose}>Content</Dialog>)
    await user.click(screen.getByText('Content'))
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
})
