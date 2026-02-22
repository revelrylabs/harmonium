import type {Meta, StoryObj} from '@storybook/react'
import {DataGrid, Badge} from 'harmonium'
import type {DataGridColumn, SortState} from 'harmonium'
import {useState} from 'react'

const meta = {
  title: 'Data/DataGrid',
  component: DataGrid,
} satisfies Meta

export default meta
type Story = StoryObj

interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
}

const users: User[] = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'inactive'},
  {id: 3, name: 'Carol Williams', email: 'carol@example.com', status: 'active'},
  {id: 4, name: 'Dan Brown', email: 'dan@example.com', status: 'active'},
]

const columns: DataGridColumn<User>[] = [
  {key: 'name', header: 'Name', sortable: true},
  {key: 'email', header: 'Email'},
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'neutral'} size="sm">
        {row.status}
      </Badge>
    ),
  },
]

export const Default: Story = {
  render: () => {
    const [sort, setSort] = useState<SortState | null>(null)
    const sorted = sort?.direction
      ? [...users].sort((a, b) => {
          const key = sort.key as keyof User
          const cmp = String(a[key]).localeCompare(String(b[key]))
          return sort.direction === 'asc' ? cmp : -cmp
        })
      : users

    return (
      <DataGrid
        columns={columns}
        data={sorted}
        rowKey={(r) => r.id}
        sort={sort}
        onSortChange={setSort}
        striped
        hoverable
      />
    )
  },
}
