import * as React from 'react'
import {describe, it, expect, vi, afterEach} from 'vitest'
import {render, screen, within} from '@testing-library/react'
import {axe} from 'vitest-axe'
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

  const rowNames = () =>
    screen
      .getAllByRole('row')
      .slice(1)
      .map((row) => within(row).getAllByRole('cell')[0].textContent)

  interface Item {
    id: number
    name: string
    qty: number | null
    added: Date
  }
  const items: Item[] = [
    {id: 1, name: 'item 10', qty: 3, added: new Date('2024-03-01')},
    {id: 2, name: 'Item 2', qty: null, added: new Date('2024-01-01')},
    {id: 3, name: 'item 1', qty: 12, added: new Date('2024-02-01')},
  ]
  const itemColumns: DataGridColumn<Item>[] = [
    {key: 'name', header: 'Name', sortable: true},
    {key: 'qty', header: 'Qty', sortable: true},
    {
      key: 'added',
      header: 'Added',
      sortable: true,
      render: (row) => row.added.toISOString().slice(0, 10),
      sortValue: (row) => row.added,
    },
  ]

  it('sorts data itself when uncontrolled', async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()
    render(
      <DataGrid
        columns={itemColumns}
        data={items}
        rowKey={(r) => r.id}
        onSortChange={onSortChange}
      />,
    )
    expect(rowNames()).toEqual(['item 10', 'Item 2', 'item 1'])

    await user.click(screen.getByRole('button', {name: 'Name'}))
    expect(rowNames()).toEqual(['item 1', 'Item 2', 'item 10'])
    expect(onSortChange).toHaveBeenLastCalledWith({key: 'name', direction: 'asc'})
    expect(screen.getByRole('columnheader', {name: 'Name'})).toHaveAttribute(
      'aria-sort',
      'ascending',
    )

    await user.click(screen.getByRole('button', {name: 'Name'}))
    expect(rowNames()).toEqual(['item 10', 'Item 2', 'item 1'])
    expect(screen.getByRole('columnheader', {name: 'Name'})).toHaveAttribute(
      'aria-sort',
      'descending',
    )

    // Third click clears the sort: original order
    await user.click(screen.getByRole('button', {name: 'Name'}))
    expect(rowNames()).toEqual(['item 10', 'Item 2', 'item 1'])
    expect(screen.getByRole('columnheader', {name: 'Name'})).not.toHaveAttribute(
      'aria-sort',
    )
  })

  it('sorts numbers numerically with empty values last', async () => {
    const user = userEvent.setup()
    render(<DataGrid columns={itemColumns} data={items} rowKey={(r) => r.id} />)
    await user.click(screen.getByRole('button', {name: 'Qty'}))
    expect(rowNames()).toEqual(['item 10', 'item 1', 'Item 2'])
    await user.click(screen.getByRole('button', {name: 'Qty'}))
    expect(rowNames()).toEqual(['item 1', 'item 10', 'Item 2'])
  })

  it('uses a column sortValue', async () => {
    const user = userEvent.setup()
    render(<DataGrid columns={itemColumns} data={items} rowKey={(r) => r.id} />)
    await user.click(screen.getByRole('button', {name: 'Added'}))
    expect(rowNames()).toEqual(['Item 2', 'item 1', 'item 10'])
  })

  it('applies defaultSort', () => {
    render(
      <DataGrid
        columns={itemColumns}
        data={items}
        rowKey={(r) => r.id}
        defaultSort={{key: 'qty', direction: 'desc'}}
      />,
    )
    expect(rowNames()).toEqual(['item 1', 'item 10', 'Item 2'])
  })

  it('leaves data order alone when sort is controlled', async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()
    render(
      <DataGrid
        columns={itemColumns}
        data={items}
        rowKey={(r) => r.id}
        sort={{key: 'name', direction: 'asc'}}
        onSortChange={onSortChange}
      />,
    )
    expect(rowNames()).toEqual(['item 10', 'Item 2', 'item 1'])
    await user.click(screen.getByRole('button', {name: 'Name'}))
    expect(onSortChange).toHaveBeenCalledWith({key: 'name', direction: 'desc'})
    expect(rowNames()).toEqual(['item 10', 'Item 2', 'item 1'])
  })

  it('names the table from aria-label and passes tableProps to it', () => {
    render(
      <DataGrid
        columns={columns}
        data={data}
        rowKey={(r) => r.id}
        aria-label="Users"
        aria-describedby="users-help"
        data-testid="wrapper"
        tableProps={{id: 'users-table', className: 'custom'}}
      />,
    )
    const table = screen.getByRole('table', {name: 'Users'})
    expect(table).toHaveAttribute('id', 'users-table')
    expect(table).toHaveAttribute('aria-describedby', 'users-help')
    expect(table).toHaveClass('root', 'custom')
    expect(screen.getByTestId('wrapper')).toHaveClass('wrapper')
    expect(screen.getByTestId('wrapper')).not.toHaveAttribute('aria-describedby')
  })

  describe('when the content overflows', () => {
    const restore: (() => void)[] = []
    afterEach(() => restore.splice(0).forEach((fn) => fn()))

    function mockOverflow() {
      for (const [prop, value] of [
        ['scrollWidth', 800],
        ['clientWidth', 400],
      ] as const) {
        const original = Object.getOwnPropertyDescriptor(Element.prototype, prop)
        Object.defineProperty(Element.prototype, prop, {
          configurable: true,
          get: () => value,
        })
        restore.push(() => {
          if (original) Object.defineProperty(Element.prototype, prop, original)
        })
      }
    }

    it('makes the scroll container a focusable, named region', async () => {
      mockOverflow()
      const ref = React.createRef<HTMLDivElement>()
      render(
        <DataGrid
          ref={ref}
          columns={columns}
          data={data}
          rowKey={(r) => r.id}
          aria-label="Users"
        />,
      )
      const region = screen.getByRole('region', {name: 'Users'})
      expect(region).toBe(ref.current)
      expect(region).toHaveAttribute('tabindex', '0')
      const user = userEvent.setup()
      await user.tab()
      expect(region).toHaveFocus()
      expect(
        await axe(region, {rules: {'color-contrast': {enabled: false}}}),
      ).toHaveNoViolations()
    })
  })

  it('is not a tab stop when nothing overflows', () => {
    render(
      <DataGrid
        columns={columns}
        data={data}
        rowKey={(r) => r.id}
        aria-label="Users"
        data-testid="wrapper"
      />,
    )
    expect(screen.getByTestId('wrapper')).not.toHaveAttribute('tabindex')
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <DataGrid
        columns={columns}
        data={data}
        rowKey={(r) => r.id}
        aria-label="Users"
        sort={{key: 'name', direction: 'asc'}}
        striped
        hoverable
      />,
    )
    expect(
      await axe(container, {rules: {'color-contrast': {enabled: false}}}),
    ).toHaveNoViolations()
  })
})
