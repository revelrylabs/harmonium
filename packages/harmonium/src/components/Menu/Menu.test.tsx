import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Menu, MenuItem, MenuSeparator, MenuLabel} from './Menu'

describe('Menu', () => {
  it('renders with menu role', () => {
    render(
      <Menu>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>,
    )
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(2)
  })

  it('handles item clicks', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Menu>
        <MenuItem onClick={onClick}>Edit</MenuItem>
      </Menu>,
    )
    await user.click(screen.getByText('Edit'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders separator', () => {
    render(
      <Menu>
        <MenuItem>Edit</MenuItem>
        <MenuSeparator />
        <MenuItem>Delete</MenuItem>
      </Menu>,
    )
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('renders label', () => {
    render(
      <Menu>
        <MenuLabel>Actions</MenuLabel>
        <MenuItem>Edit</MenuItem>
      </Menu>,
    )
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('applies danger variant', () => {
    render(
      <Menu>
        <MenuItem variant="danger">Delete</MenuItem>
      </Menu>,
    )
    expect(screen.getByText('Delete')).toHaveAttribute('data-variant', 'danger')
  })

  it('supports disabled items', () => {
    render(
      <Menu>
        <MenuItem disabled>Locked</MenuItem>
      </Menu>,
    )
    expect(screen.getByText('Locked')).toBeDisabled()
  })
})
