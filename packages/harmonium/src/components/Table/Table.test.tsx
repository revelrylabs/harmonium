import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Table, TableHead, TableBody, TableRow, TableHeader, TableCell} from './Table'

describe('Table', () => {
  it('renders a table', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })

  it('applies striped attribute', () => {
    render(<Table striped data-testid="table"><tbody><tr><td>A</td></tr></tbody></Table>)
    expect(screen.getByTestId('table')).toHaveAttribute('data-striped')
  })

  it('wraps in responsive container when responsive', () => {
    const {container} = render(<Table responsive><tbody><tr><td>A</td></tr></tbody></Table>)
    expect(container.firstChild).not.toBe(screen.getByRole('table'))
    expect(screen.getByRole('table').parentElement).toBeInTheDocument()
  })
})
