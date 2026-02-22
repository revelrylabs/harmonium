import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {DataGrid} from './DataGrid'
import type {DataGridColumn} from './DataGrid'

interface User {
  id: number
  name: string
  email: string
}

const columns: DataGridColumn<User>[] = [
  {key: 'name', header: 'Name', sortable: true},
  {key: 'email', header: 'Email'},
]

const data: User[] = [
  {id: 1, name: 'Alice', email: 'alice@example.com'},
  {id: 2, name: 'Bob', email: 'bob@example.com'},
]

describe('DataGrid', () => {
  it('renders headers and rows', () => {
    render(<DataGrid columns={columns} data={data} rowKey={(r) => r.id} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('bob@example.com')).toBeInTheDocument()
  })

  it('renders sortable column with button', () => {
    render(<DataGrid columns={columns} data={data} rowKey={(r) => r.id} />)
    // Name is sortable, so it should be a button
    const nameHeader = screen.getByText('Name')
    expect(nameHeader.closest('button')).toBeInTheDocument()
    // Email is not sortable
    const emailHeader = screen.getByText('Email')
    expect(emailHeader.closest('button')).not.toBeInTheDocument()
  })

  it('calls onSortChange when clicking sortable column', async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()
    render(
      <DataGrid
        columns={columns}
        data={data}
        rowKey={(r) => r.id}
        onSortChange={onSortChange}
      />,
    )
    await user.click(screen.getByText('Name'))
    expect(onSortChange).toHaveBeenCalledWith({key: 'name', direction: 'asc'})
  })

  it('toggles sort direction', async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()
    render(
      <DataGrid
        columns={columns}
        data={data}
        rowKey={(r) => r.id}
        sort={{key: 'name', direction: 'asc'}}
        onSortChange={onSortChange}
      />,
    )
    await user.click(screen.getByText('Name'))
    expect(onSortChange).toHaveBeenCalledWith({key: 'name', direction: 'desc'})
  })

  it('supports custom render function', () => {
    const cols: DataGridColumn<User>[] = [
      {key: 'name', header: 'Name', render: (row) => <strong>{row.name}</strong>},
    ]
    render(<DataGrid columns={cols} data={data} rowKey={(r) => r.id} />)
    expect(screen.getByText('Alice').tagName).toBe('STRONG')
  })
})
