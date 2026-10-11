import * as React from 'react'
import {describe, it, expect, vi, afterEach} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
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

  const body = (
    <TableBody>
      <TableRow>
        <TableCell>Alice</TableCell>
      </TableRow>
    </TableBody>
  )

  it('passes props, ARIA and ref to the <table> when responsive', async () => {
    const user = userEvent.setup()
    const ref = React.createRef<HTMLTableElement>()
    const onClick = vi.fn()
    render(
      <Table responsive ref={ref} aria-label="People" id="people" onClick={onClick}>
        {body}
      </Table>,
    )
    const table = screen.getByRole('table', {name: 'People'})
    expect(ref.current).toBe(table)
    expect(table).toHaveAttribute('id', 'people')
    await user.click(screen.getByText('Alice'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  describe('responsive scroll region', () => {
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

    it('is focusable and named after the table when it overflows', async () => {
      mockOverflow()
      const user = userEvent.setup()
      render(
        <>
          <span id="caption">Team members</span>
          <Table responsive aria-labelledby="caption">
            {body}
          </Table>
        </>,
      )
      const region = screen.getByRole('region', {name: 'Team members'})
      expect(region).toHaveClass('responsive')
      expect(region).toContainElement(screen.getByRole('table'))
      await user.tab()
      expect(region).toHaveFocus()
    })

    it('is focusable but not a landmark without a table name', () => {
      mockOverflow()
      const {container} = render(<Table responsive>{body}</Table>)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveAttribute('tabindex', '0')
      expect(wrapper).not.toHaveAttribute('role')
    })

    it('is not a tab stop when nothing overflows', () => {
      const {container} = render(
        <Table responsive aria-label="People">
          {body}
        </Table>,
      )
      expect(container.firstChild).not.toHaveAttribute('tabindex')
      expect(screen.queryByRole('region')).not.toBeInTheDocument()
    })

    it('has no axe violations when overflowing', async () => {
      mockOverflow()
      const {container} = render(
        <Table responsive aria-label="People" striped hoverable>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
            </TableRow>
          </TableHead>
          {body}
        </Table>,
      )
      expect(
        await axe(container, {rules: {'color-contrast': {enabled: false}}}),
      ).toHaveNoViolations()
    })
  })
})
