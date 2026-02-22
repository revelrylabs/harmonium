import {describe, it, expect} from 'vitest'
import {render} from '@testing-library/react'
import {Skeleton} from './Skeleton'

describe('Skeleton', () => {
  it('renders with aria-hidden', () => {
    const {container} = render(<Skeleton />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('defaults to text variant', () => {
    const {container} = render(<Skeleton />)
    expect(container.firstChild).toHaveAttribute('data-variant', 'text')
  })

  it('applies width and height', () => {
    const {container} = render(<Skeleton width={200} height={20} />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('200px')
    expect(el.style.height).toBe('20px')
  })

  it('accepts string dimensions', () => {
    const {container} = render(<Skeleton width="100%" height="2rem" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('100%')
    expect(el.style.height).toBe('2rem')
  })

  it('applies circular variant', () => {
    const {container} = render(<Skeleton variant="circular" />)
    expect(container.firstChild).toHaveAttribute('data-variant', 'circular')
  })
})
