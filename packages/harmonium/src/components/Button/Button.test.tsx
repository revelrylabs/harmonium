import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Button} from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', {name: 'Click me'})).toBeInTheDocument()
  })

  it('defaults to primary variant and md size', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-variant', 'primary')
    expect(button).toHaveAttribute('data-size', 'md')
  })

  it('applies variant data attribute', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveAttribute(
      'data-variant',
      'outline',
    )
  })

  it('applies size data attribute', () => {
    render(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg')
  })

  it('applies expanded data attribute', () => {
    render(<Button expanded>Full width</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-expanded')
  })

  it('does not set data-expanded when false', () => {
    render(<Button>Normal</Button>)
    expect(screen.getByRole('button')).not.toHaveAttribute('data-expanded')
  })

  it('merges custom className', () => {
    render(<Button className="custom">Styled</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn<(el: HTMLButtonElement | null) => void>()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('supports disabled state', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('passes through additional HTML attributes', () => {
    render(
      <Button type="submit" aria-label="Submit form">
        Submit
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveAttribute('aria-label', 'Submit form')
  })
})
