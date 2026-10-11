import {describe, it, expect, vi} from 'vitest'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import {CommandPalette} from './CommandPalette'

const items = [
  {id: '1', label: 'New File', group: 'File', onSelect: vi.fn()},
  {id: '2', label: 'Open File', group: 'File', onSelect: vi.fn()},
  {id: '3', label: 'Toggle Theme', group: 'Settings', onSelect: vi.fn()},
]

describe('CommandPalette', () => {
  it('renders nothing when closed', () => {
    render(<CommandPalette open={false} items={items} />)
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  it('renders when open', () => {
    render(<CommandPalette open items={items} />)
    expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument()
  })

  it('shows all items', () => {
    render(<CommandPalette open items={items} />)
    expect(screen.getByText('New File')).toBeInTheDocument()
    expect(screen.getByText('Open File')).toBeInTheDocument()
    expect(screen.getByText('Toggle Theme')).toBeInTheDocument()
  })

  it('shows group labels', () => {
    render(<CommandPalette open items={items} />)
    expect(screen.getByText('File')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('filters items by query', async () => {
    const user = userEvent.setup()
    render(<CommandPalette open items={items} />)
    await user.type(screen.getByPlaceholderText('Type a command...'), 'toggle')
    expect(screen.queryByText('New File')).not.toBeInTheDocument()
    expect(screen.getByText('Toggle Theme')).toBeInTheDocument()
  })

  it('calls onSelect and onClose when item is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<CommandPalette open items={items} onClose={onClose} />)
    await user.click(screen.getByText('New File'))
    expect(items[0].onSelect).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })

  it('shows no results message', async () => {
    const user = userEvent.setup()
    render(<CommandPalette open items={items} />)
    await user.type(screen.getByPlaceholderText('Type a command...'), 'xyz')
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('arrow keys follow the on-screen order when groups are interleaved', async () => {
    const user = userEvent.setup()
    const onSelect = {a: vi.fn(), b: vi.fn(), c: vi.fn()}
    const interleaved = [
      {id: 'a', label: 'Alpha', group: 'File', onSelect: onSelect.a},
      {id: 'b', label: 'Beta', group: 'App', onSelect: onSelect.b},
      {id: 'c', label: 'Gamma', group: 'File', onSelect: onSelect.c},
    ]
    render(<CommandPalette open items={interleaved} />)

    // Rendered grouped: File (Alpha, Gamma), then App (Beta)
    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual([
      'Alpha',
      'Gamma',
      'Beta',
    ])

    await user.type(screen.getByRole('combobox'), '{ArrowDown}')
    expect(screen.getByRole('option', {selected: true})).toHaveTextContent('Gamma')

    await user.type(screen.getByRole('combobox'), '{Enter}')
    expect(onSelect.c).toHaveBeenCalledOnce()
    expect(onSelect.b).not.toHaveBeenCalled()
  })

  it('focuses the input when opened and returns focus on close', async () => {
    const {rerender} = render(
      <>
        <button>Open</button>
        <CommandPalette open={false} items={items} />
      </>,
    )
    const trigger = screen.getByRole('button', {name: 'Open'})
    trigger.focus()
    rerender(
      <>
        <button>Open</button>
        <CommandPalette open items={items} />
      </>,
    )
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveFocus())
    rerender(
      <>
        <button>Open</button>
        <CommandPalette open={false} items={items} />
      </>,
    )
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('calls onClose on Escape and on overlay click', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<CommandPalette open items={items} onClose={onClose} />)
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
    await user.click(document.querySelector('.overlay') as Element)
    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('renders a labelled modal dialog', () => {
    render(<CommandPalette open items={items} />)
    expect(screen.getByRole('dialog', {name: 'Command palette'})).toHaveAttribute(
      'aria-modal',
      'true',
    )
  })

  // The input used to be a plain textbox; it is now a combobox (intentional,
  // #690), so the queries above look it up by that role.
  it('exposes the input as a combobox that controls the listbox', () => {
    render(<CommandPalette open items={items} />)
    const input = screen.getByRole('combobox', {name: 'Type a command...'})
    const listbox = screen.getByRole('listbox', {name: 'Commands'})
    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(input).toHaveAttribute('aria-controls', listbox.id)
  })

  it('points aria-activedescendant at the highlighted option', async () => {
    const user = userEvent.setup()
    render(<CommandPalette open items={items} />)
    const input = screen.getByRole('combobox')
    const options = screen.getAllByRole('option')
    expect(new Set(options.map((o) => o.id)).size).toBe(options.length)
    expect(input).toHaveAttribute('aria-activedescendant', options[0].id)
    await user.type(input, '{ArrowDown}')
    expect(input).toHaveAttribute('aria-activedescendant', options[1].id)
    await user.type(input, 'xyz')
    expect(input).not.toHaveAttribute('aria-activedescendant')
  })

  it('groups options under their labels', () => {
    render(<CommandPalette open items={items} />)
    const file = screen.getByRole('group', {name: 'File'})
    expect(file).toContainElement(screen.getByRole('option', {name: 'Open File'}))
  })

  it('scrolls the highlighted option into view', async () => {
    const user = userEvent.setup()
    const scrollIntoView = vi.fn()
    const original = Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = scrollIntoView
    try {
      render(<CommandPalette open items={items} />)
      scrollIntoView.mockClear()
      await user.type(screen.getByRole('combobox'), '{ArrowDown}')
      expect(scrollIntoView).toHaveBeenCalledWith({block: 'nearest'})
      expect(scrollIntoView.mock.contexts.at(-1)).toHaveTextContent('Open File')
    } finally {
      Element.prototype.scrollIntoView = original
    }
  })

  it('has no axe violations with no results', async () => {
    const user = userEvent.setup()
    render(<CommandPalette open items={items} />)
    await user.type(screen.getByRole('combobox'), 'xyz')
    expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations()
  })

  it('has no axe violations', async () => {
    render(<CommandPalette open items={items} />)
    expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations()
  })
})
