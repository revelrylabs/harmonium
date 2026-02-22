import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {CommandPalette} from './CommandPalette'

const items = [
  {id: '1', label: 'New File', group: 'File', onSelect: vi.fn()},
  {id: '2', label: 'Open File', group: 'File', onSelect: vi.fn()},
  {id: '3', label: 'Toggle Theme', group: 'Settings', onSelect: vi.fn()},
]

describe('CommandPalette', () => {
  it('renders nothing when closed', () => {
    render(<CommandPalette open={false} items={items} />)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
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
})
