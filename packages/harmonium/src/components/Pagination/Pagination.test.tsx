import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import {Pagination} from './Pagination'

describe('Pagination', () => {
  it('renders page buttons', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('marks current page with aria-current', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('3')).toHaveAttribute('aria-current', 'page')
  })

  it('disables previous button on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByLabelText('Next page')).toBeDisabled()
  })

  it('calls onPageChange when clicking a page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />)
    await user.click(screen.getByText('3'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with next page on next click', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />)
    await user.click(screen.getByLabelText('Next page'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('shows ellipsis for large page counts', () => {
    render(<Pagination page={5} totalPages={20} onPageChange={() => {}} maxVisible={5} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
  })

  it('hides ellipsis markers from assistive tech', () => {
    render(<Pagination page={10} totalPages={20} onPageChange={() => {}} maxVisible={5} />)
    const ellipses = screen.getAllByText('…')
    expect(ellipses).toHaveLength(2)
    for (const ellipsis of ellipses) {
      expect(ellipsis).toHaveAttribute('aria-hidden', 'true')
    }
  })

  const pageButtons = () =>
    screen
      .getAllByRole('button')
      .filter((b) => !b.hasAttribute('aria-label'))
      .map((b) => Number(b.textContent))

  it.each([
    [1, [1, 2, 3, 4, 20]],
    [5, [1, 4, 5, 6, 20]],
    [10, [1, 9, 10, 11, 20]],
    [20, [1, 17, 18, 19, 20]],
  ])('renders at most maxVisible page buttons (page %i)', (page, expected) => {
    render(<Pagination page={page} totalPages={20} onPageChange={() => {}} maxVisible={5} />)
    expect(pageButtons()).toEqual(expected)
  })

  it('respects small and large maxVisible values', () => {
    const {rerender} = render(
      <Pagination page={5} totalPages={20} onPageChange={() => {}} maxVisible={7} />,
    )
    expect(pageButtons()).toEqual([1, 3, 4, 5, 6, 7, 20])
    rerender(<Pagination page={5} totalPages={20} onPageChange={() => {}} maxVisible={1} />)
    expect(pageButtons()).toEqual([5])
    rerender(<Pagination page={5} totalPages={4} onPageChange={() => {}} maxVisible={5} />)
    expect(pageButtons()).toEqual([1, 2, 3, 4])
  })

  it('clamps a page past totalPages to the last page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={12} totalPages={10} onPageChange={onPageChange} />)
    expect(screen.getByText('10')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByLabelText('Next page')).toBeDisabled()
    await user.click(screen.getByLabelText('Previous page'))
    expect(onPageChange).toHaveBeenCalledWith(9)
  })

  it('clamps a page below 1 to the first page', () => {
    render(<Pagination page={0} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
  })

  it('calls a consumer onClick on the nav alongside page changes', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const onPageChange = vi.fn()
    render(
      <Pagination page={1} totalPages={5} onPageChange={onPageChange} onClick={onClick} />,
    )
    await user.click(screen.getByText('2'))
    expect(onPageChange).toHaveBeenCalledWith(2)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <Pagination page={5} totalPages={20} onPageChange={() => {}} />,
    )
    expect(
      await axe(container, {rules: {'color-contrast': {enabled: false}}}),
    ).toHaveNoViolations()
  })
})
