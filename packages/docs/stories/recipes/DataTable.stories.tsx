import type {Meta, StoryObj} from '@storybook/react'
import React, {useState, useMemo} from 'react'
import {
  DataGrid,
  Input,
  Select,
  Badge,
  Pagination,
  Stack,
  Group,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  Button,
} from 'harmonium'
import type {DataGridColumn, SortState} from 'harmonium'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive' | 'Pending'
  joined: string
}

const allUsers: User[] = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2025-01-15'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2025-02-20'},
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', joined: '2025-03-10'},
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active', joined: '2025-04-05'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Pending', joined: '2025-05-12'},
  {id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Active', joined: '2025-06-08'},
  {id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active', joined: '2025-07-22'},
  {id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Viewer', status: 'Inactive', joined: '2025-08-14'},
  {id: 9, name: 'Iris Taylor', email: 'iris@example.com', role: 'Admin', status: 'Active', joined: '2025-09-03'},
  {id: 10, name: 'Jack Anderson', email: 'jack@example.com', role: 'Editor', status: 'Pending', joined: '2025-10-19'},
  {id: 11, name: 'Karen Thomas', email: 'karen@example.com', role: 'Viewer', status: 'Active', joined: '2025-11-01'},
  {id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Editor', status: 'Active', joined: '2025-12-15'},
]

const PAGE_SIZE = 5

const statusVariant: Record<string, 'success' | 'error' | 'warning'> = {
  Active: 'success',
  Inactive: 'error',
  Pending: 'warning',
}

function FilterableDataTable() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sort, setSort] = useState<SortState | null>(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = allUsers

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q),
      )
    }

    if (roleFilter) {
      result = result.filter((u) => u.role === roleFilter)
    }

    if (statusFilter) {
      result = result.filter((u) => u.status === statusFilter)
    }

    if (sort) {
      result = [...result].sort((a, b) => {
        const aVal = a[sort.key as keyof User]
        const bVal = b[sort.key as keyof User]
        const cmp = String(aVal).localeCompare(String(bVal))
        return sort.direction === 'desc' ? -cmp : cmp
      })
    }

    return result
  }, [search, roleFilter, statusFilter, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  )

  const columns: DataGridColumn<User>[] = [
    {key: 'name', header: 'Name', sortable: true},
    {key: 'email', header: 'Email', sortable: true},
    {key: 'role', header: 'Role', sortable: true},
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <Badge variant={statusVariant[row.status]} size="sm">
          {row.status}
        </Badge>
      ),
    },
    {key: 'joined', header: 'Joined', sortable: true},
  ]

  const handleSortChange = (newSort: SortState) => {
    setSort(newSort)
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setRoleFilter('')
    setStatusFilter('')
    setPage(1)
  }

  const hasFilters = search || roleFilter || statusFilter

  return (
    <div style={{maxWidth: 960, margin: '0 auto'}}>
      <Stack gap="lg">
        <div>
          <h1 style={{margin: '0 0 4px', fontSize: '1.5rem'}}>Users</h1>
          <p style={{margin: 0, color: '#666', fontSize: '0.875rem'}}>
            Manage your team members and their roles.
          </p>
        </div>

        <Card>
          <CardHeader>
            <Group gap="md" align="end">
              <div style={{flex: 1}}>
                <Input
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  size="sm"
                />
              </div>
              <Select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value)
                  setPage(1)
                }}
                size="sm"
                style={{width: 140}}
              >
                <option value="">All roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </Select>
              <Select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setPage(1)
                }}
                size="sm"
                style={{width: 140}}
              >
                <option value="">All statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </Select>
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              )}
            </Group>
          </CardHeader>
          <CardBody>
            {paginated.length > 0 ? (
              <Stack gap="md">
                <DataGrid
                  columns={columns}
                  data={paginated}
                  rowKey={(row) => row.id}
                  sort={sort}
                  onSortChange={handleSortChange}
                  striped
                  hoverable
                />
                <Group justify="between" align="center">
                  <span style={{fontSize: '0.875rem', color: '#666'}}>
                    Showing {(page - 1) * PAGE_SIZE + 1}–
                    {Math.min(page * PAGE_SIZE, filtered.length)} of{' '}
                    {filtered.length} users
                  </span>
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </Group>
              </Stack>
            ) : (
              <EmptyState
                title="No users found"
                description="Try adjusting your search or filters."
                action={
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                }
              />
            )}
          </CardBody>
        </Card>
      </Stack>
    </div>
  )
}

const meta: Meta = {
  title: 'Recipes/Data Table',
  parameters: {
    docs: {
      description: {
        component: `
A filterable, sortable, paginated data table. Includes search, dropdown filters, sort controls, pagination, and an empty state. Copy-paste and customize for your app.

**Components used:** DataGrid, Input, Select, Badge, Pagination, EmptyState, Card, Button, Stack, Group
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <FilterableDataTable />,
}
