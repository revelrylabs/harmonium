import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Tag} from './Tag'

describe('Tag', () => {
  it('renders children', () => {
    render(<Tag>React</Tag>)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('defaults to neutral variant and md size', () => {
    render(<Tag data-testid="tag">Label</Tag>)
    const el = screen.getByTestId('tag')
    expect(el).toHaveAttribute('data-variant', 'neutral')
    expect(el).toHaveAttribute('data-size', 'md')
  })

  it('applies variant data attribute', () => {
    render(
      <Tag data-testid="tag" variant="success">
        Done
      </Tag>,
    )
    expect(screen.getByTestId('tag')).toHaveAttribute('data-variant', 'success')
  })

  it('applies size data attribute', () => {
    render(
      <Tag data-testid="tag" size="sm">
        Small
      </Tag>,
    )
    expect(screen.getByTestId('tag')).toHaveAttribute('data-size', 'sm')
  })

  it('renders remove button when removable', () => {
    render(<Tag removable>Removable</Tag>)
    expect(screen.getByLabelText('Remove')).toBeInTheDocument()
  })

  it('does not render remove button by default', () => {
    render(<Tag>Static</Tag>)
    expect(screen.queryByLabelText('Remove')).not.toBeInTheDocument()
  })

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(
      <Tag removable onRemove={onRemove}>
        Tag
      </Tag>,
    )
    await user.click(screen.getByLabelText('Remove'))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it('renders icon when provided', () => {
    render(
      <Tag icon={<span data-testid="icon">I</span>}>With Icon</Tag>,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(
      <Tag data-testid="tag" className="custom">
        Styled
      </Tag>,
    )
    expect(screen.getByTestId('tag')).toHaveClass('custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn<(el: HTMLSpanElement | null) => void>()
    render(<Tag ref={ref}>Ref</Tag>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })
})
