import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Drawer} from './Drawer'

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
    const {container} = render(<Drawer open onClose={onClose}>Content</Drawer>)
    await user.click(container.firstChild as Element)
    expect(onClose).toHaveBeenCalledOnce()
  })
})
