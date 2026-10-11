import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Avatar} from './Avatar'
import {configureAxe} from 'vitest-axe'
// jsdom has no layout, so colour contrast can't be computed here
const axe = configureAxe({rules: {'color-contrast': {enabled: false}}})


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


  it('exposes the fallback as a named image', () => {
    render(<Avatar fallback="JD" alt="Jane Doe" />)
    expect(screen.getByRole('img', {name: 'Jane Doe'})).toHaveTextContent('JD')
  })

  it('names the fallback image with its text when there is no alt', () => {
    render(<Avatar fallback="JD" />)
    expect(screen.getByRole('img', {name: 'JD'})).toBeInTheDocument()
  })

  it('hides an empty fallback from assistive technology', () => {
    render(<Avatar data-testid="avatar" />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <>
        <Avatar fallback="JD" alt="Jane Doe" />
        <Avatar src="/photo.jpg" alt="John Doe" />
        <Avatar />
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
