import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Avatar} from './Avatar'

describe('Avatar', () => {
  it('renders fallback text when no src', () => {
    render(<Avatar fallback="JD" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders image when src is provided', () => {
    render(<Avatar src="/photo.jpg" alt="John Doe" />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/photo.jpg')
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'John Doe')
  })

  it('defaults to md size', () => {
    render(<Avatar data-testid="avatar" fallback="A" />)
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-size', 'md')
  })

  it('applies size', () => {
    render(<Avatar data-testid="avatar" fallback="A" size="xl" />)
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-size', 'xl')
  })
})
