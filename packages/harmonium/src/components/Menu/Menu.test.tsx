import {describe, it, expect, vi, beforeAll} from 'vitest'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import {Menu, MenuItem, MenuSeparator, MenuLabel} from './Menu'
import {Button} from '../Button'

beforeAll(() => {
  // jsdom reports a 0x0 viewport, which makes Base UI flip every popup to
  // the opposite side. Give it a real size.
  Object.defineProperty(document.documentElement, 'clientWidth', {value: 1024, configurable: true})
  Object.defineProperty(document.documentElement, 'clientHeight', {value: 768, configurable: true})
})

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

  describe('inline keyboard navigation', () => {
    function renderMenu() {
      return render(
        <>
          <button>Before</button>
          <Menu aria-label="Actions">
            <MenuLabel>Actions</MenuLabel>
            <MenuItem>Edit</MenuItem>
            <MenuItem disabled>Locked</MenuItem>
            <MenuItem>Duplicate</MenuItem>
            <MenuSeparator />
            <MenuItem variant="danger">Delete</MenuItem>
          </Menu>
          <button>After</button>
        </>,
      )
    }

    it('is a single tab stop', async () => {
      const user = userEvent.setup()
      renderMenu()
      await user.tab()
      await user.tab()
      expect(screen.getByRole('menuitem', {name: 'Edit'})).toHaveFocus()
      await user.tab()
      expect(screen.getByRole('button', {name: 'After'})).toHaveFocus()
    })

    it('moves with arrow keys, skips disabled items and wraps', async () => {
      const user = userEvent.setup()
      renderMenu()
      await user.tab()
      await user.tab()
      await user.keyboard('{ArrowDown}')
      expect(screen.getByRole('menuitem', {name: 'Duplicate'})).toHaveFocus()
      await user.keyboard('{ArrowDown}')
      expect(screen.getByRole('menuitem', {name: 'Delete'})).toHaveFocus()
      await user.keyboard('{ArrowDown}')
      expect(screen.getByRole('menuitem', {name: 'Edit'})).toHaveFocus()
      await user.keyboard('{ArrowUp}')
      expect(screen.getByRole('menuitem', {name: 'Delete'})).toHaveFocus()
    })

    it('supports Home, End and typeahead', async () => {
      const user = userEvent.setup()
      renderMenu()
      await user.tab()
      await user.tab()
      await user.keyboard('{End}')
      expect(screen.getByRole('menuitem', {name: 'Delete'})).toHaveFocus()
      await user.keyboard('{Home}')
      expect(screen.getByRole('menuitem', {name: 'Edit'})).toHaveFocus()
      await user.keyboard('d')
      expect(screen.getByRole('menuitem', {name: 'Duplicate'})).toHaveFocus()
      await user.keyboard('d')
      expect(screen.getByRole('menuitem', {name: 'Delete'})).toHaveFocus()
    })

    it('returns to the last focused item when tabbing back in', async () => {
      const user = userEvent.setup()
      renderMenu()
      await user.tab()
      await user.tab()
      await user.keyboard('{End}')
      await user.tab()
      await user.tab({shift: true})
      expect(screen.getByRole('menuitem', {name: 'Delete'})).toHaveFocus()
    })

    it('runs consumer onKeyDown alongside the built-in handler', async () => {
      const user = userEvent.setup()
      const onKeyDown = vi.fn()
      render(
        <Menu onKeyDown={onKeyDown}>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </Menu>,
      )
      await user.tab()
      await user.keyboard('{ArrowDown}')
      expect(onKeyDown).toHaveBeenCalled()
      expect(screen.getByRole('menuitem', {name: 'Delete'})).toHaveFocus()
    })
  })

  describe('dropdown (trigger)', () => {
    function renderDropdown(onEdit = vi.fn()) {
      render(
        <Menu trigger={<Button>Actions</Button>}>
          <MenuLabel>Item</MenuLabel>
          <MenuItem onClick={onEdit}>Edit</MenuItem>
          <MenuItem disabled>Locked</MenuItem>
          <MenuSeparator />
          <MenuItem variant="danger">Delete</MenuItem>
        </Menu>,
      )
      return screen.getByRole('button', {name: 'Actions'})
    }

    it('wires the trigger with aria-haspopup and aria-expanded', async () => {
      const user = userEvent.setup()
      const trigger = renderDropdown()
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      await user.click(trigger)
      expect(await screen.findByRole('menu')).toBeInTheDocument()
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    it('opens with ArrowDown, navigates with arrows and activates with Enter', async () => {
      const user = userEvent.setup()
      const onEdit = vi.fn()
      const trigger = renderDropdown(onEdit)
      trigger.focus()
      await user.keyboard('{ArrowDown}')
      await waitFor(() => expect(screen.getByRole('menuitem', {name: 'Edit'})).toHaveFocus())
      await user.keyboard('{End}')
      expect(screen.getByRole('menuitem', {name: 'Delete'})).toHaveFocus()
      await user.keyboard('{Home}{Enter}')
      expect(onEdit).toHaveBeenCalledOnce()
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
      await waitFor(() => expect(trigger).toHaveFocus())
    })

    it('closes on Escape and returns focus to the trigger', async () => {
      const user = userEvent.setup()
      const trigger = renderDropdown()
      trigger.focus()
      await user.keyboard('{ArrowDown}')
      await screen.findByRole('menu')
      await user.keyboard('{Escape}')
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
      await waitFor(() => expect(trigger).toHaveFocus())
    })

    it('keeps class names and variant attributes', async () => {
      const user = userEvent.setup()
      const trigger = renderDropdown()
      await user.click(trigger)
      expect(await screen.findByRole('menu')).toHaveClass('root')
      const deleteItem = screen.getByRole('menuitem', {name: 'Delete'})
      expect(deleteItem).toHaveClass('item')
      expect(deleteItem).toHaveAttribute('data-variant', 'danger')
      expect(screen.getByRole('menuitem', {name: 'Locked'})).toHaveAttribute(
        'aria-disabled',
        'true',
      )
    })
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <Menu aria-label="Account">
        <MenuLabel>Account</MenuLabel>
        <MenuItem>Profile</MenuItem>
        <MenuSeparator />
        <MenuItem variant="danger">Delete account</MenuItem>
      </Menu>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
