import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import {axe} from 'vitest-axe'
import {Text, Heading} from './Typography'

describe('Text', () => {
  it('renders as paragraph by default', () => {
    render(<Text data-testid="text">Hello</Text>)
    const el = screen.getByTestId('text')
    expect(el.tagName).toBe('P')
    expect(el).toHaveTextContent('Hello')
  })

  it('renders as a different element via as prop', () => {
    render(
      <Text data-testid="text" as="span">
        Inline
      </Text>,
    )
    expect(screen.getByTestId('text').tagName).toBe('SPAN')
  })

  it('defaults to md size', () => {
    render(<Text data-testid="text">Content</Text>)
    expect(screen.getByTestId('text')).toHaveAttribute('data-size', 'md')
  })

  it('applies size data attribute', () => {
    render(
      <Text data-testid="text" size="xs">
        Small
      </Text>,
    )
    expect(screen.getByTestId('text')).toHaveAttribute('data-size', 'xs')
  })

  it('applies weight data attribute', () => {
    render(
      <Text data-testid="text" weight="bold">
        Bold
      </Text>,
    )
    expect(screen.getByTestId('text')).toHaveAttribute('data-weight', 'bold')
  })

  it('applies color data attribute', () => {
    render(
      <Text data-testid="text" color="muted">
        Muted
      </Text>,
    )
    expect(screen.getByTestId('text')).toHaveAttribute('data-color', 'muted')
  })

  it('applies truncate data attribute', () => {
    render(
      <Text data-testid="text" truncate>
        Long text
      </Text>,
    )
    expect(screen.getByTestId('text')).toHaveAttribute('data-truncate')
  })

  it('merges custom className', () => {
    render(
      <Text data-testid="text" className="custom">
        Styled
      </Text>,
    )
    expect(screen.getByTestId('text')).toHaveClass('custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn<(el: HTMLElement | null) => void>()
    render(<Text ref={ref}>Content</Text>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })
})

describe('Heading', () => {
  it('renders as h2 by default', () => {
    render(<Heading data-testid="heading">Title</Heading>)
    const el = screen.getByTestId('heading')
    expect(el.tagName).toBe('H2')
    expect(el).toHaveTextContent('Title')
  })

  it('renders the correct heading level', () => {
    render(
      <Heading data-testid="heading" level={1}>
        Page Title
      </Heading>,
    )
    expect(screen.getByTestId('heading').tagName).toBe('H1')
  })

  it('maps heading level to default visual size', () => {
    render(
      <Heading data-testid="heading" level={1}>
        H1
      </Heading>,
    )
    expect(screen.getByTestId('heading')).toHaveAttribute('data-size', '4xl')
  })

  it('allows overriding visual size independently of level', () => {
    render(
      <Heading data-testid="heading" level={3} size="xl">
        H3 with xl size
      </Heading>,
    )
    const el = screen.getByTestId('heading')
    expect(el.tagName).toBe('H3')
    expect(el).toHaveAttribute('data-size', 'xl')
  })

  it('merges custom className', () => {
    render(
      <Heading data-testid="heading" className="custom">
        Title
      </Heading>,
    )
    expect(screen.getByTestId('heading')).toHaveClass('custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn<(el: HTMLHeadingElement | null) => void>()
    render(<Heading ref={ref}>Title</Heading>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLHeadingElement))
  })
})

describe('Text as label', () => {
  it('accepts htmlFor and labels the control', () => {
    render(
      <>
        <Text as="label" htmlFor="email">
          Email
        </Text>
        <input id="email" />
      </>,
    )
    expect(screen.getByRole('textbox', {name: 'Email'})).toBeInTheDocument()
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email')
  })

  it('drops htmlFor on elements that are not labels', () => {
    render(
      <Text as="span" htmlFor="email">
        Email
      </Text>,
    )
    expect(screen.getByText('Email')).not.toHaveAttribute('for')
  })

  it('type-checks label props', () => {
    // Type-level checks: these fail `tsc` if TextProps regresses.
    const label = <Text as="label" htmlFor="x" />
    // @ts-expect-error: `as` only accepts text elements
    const bad = <Text as="button" />
    expect([label, bad]).toHaveLength(2)
  })
})

describe('Typography accessibility', () => {
  it('has no axe violations', async () => {
    const {container} = render(
      <main>
        <Heading level={1}>Account</Heading>
        <Heading level={2} size="md">
          Profile
        </Heading>
        <Text>Body copy</Text>
        <Text as="span" color="muted" size="sm" truncate>
          Muted
        </Text>
        <Text as="label" htmlFor="name">
          Name
        </Text>
        <input id="name" />
      </main>,
    )
    expect(
      await axe(container, {rules: {'color-contrast': {enabled: false}}}),
    ).toHaveNoViolations()
  })
})
