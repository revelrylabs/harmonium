import type {Meta, StoryObj} from '@storybook/react'
import {Table, TableHead, TableBody, TableRow, TableHeader, TableCell} from 'harmonium'

const meta = {
  title: 'Data/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: `Semantic HTML table with optional striping and hover styles. Use with \`TableHead\`, \`TableBody\`, \`TableRow\`, \`TableHeader\`, and \`TableCell\`.

\`\`\`tsx
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from 'harmonium'

<Table striped hoverable>
  <TableHead>
    <TableRow><TableHeader>Name</TableHeader></TableRow>
  </TableHead>
  <TableBody>
    <TableRow><TableCell>Jane</TableCell></TableRow>
  </TableBody>
</Table>
\`\`\`

Set \`striped\` for alternating row backgrounds, \`hoverable\` for row hover effect, and \`responsive\` for horizontal scrolling on small screens.
For sortable columns with custom renderers, use \`DataGrid\` instead.`,
      },
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Role</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Alice Johnson</TableCell>
          <TableCell>alice@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Smith</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Carol Williams</TableCell>
          <TableCell>carol@example.com</TableCell>
          <TableCell>Viewer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const Striped: Story = {
  render: () => (
    <Table striped>
      <TableHead>
        <TableRow>
          <TableHeader>Product</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Stock</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {['Widget A', 'Widget B', 'Widget C', 'Widget D'].map((name, i) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>${(i + 1) * 9.99}</TableCell>
            <TableCell>{(i + 1) * 12}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
