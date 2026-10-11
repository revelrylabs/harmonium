import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {axe} from 'vitest-axe'
import {Stack} from './Stack'

describe('Stack', () => {
  it('renders children', () => {
    render(<Stack data-testid="stack"><span>Item</span></Stack>)
    expect(screen.getByTestId('stack')).toBeInTheDocument()
    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('defaults to vertical direction and md gap', () => {
    render(<Stack data-testid="stack">Content</Stack>)
    const el = screen.getByTestId('stack')
    expect(el).toHaveAttribute('data-direction', 'vertical')
    expect(el).toHaveAttribute('data-gap', 'md')
  })

  it('applies horizontal direction', () => {
    render(<Stack data-testid="stack" direction="horizontal">Content</Stack>)
    expect(screen.getByTestId('stack')).toHaveAttribute('data-direction', 'horizontal')
  })

  it('applies align and justify', () => {
    render(<Stack data-testid="stack" align="center" justify="between">Content</Stack>)
    const el = screen.getByTestId('stack')
    expect(el).toHaveAttribute('data-align', 'center')
    expect(el).toHaveAttribute('data-justify', 'between')
  })

  it('applies wrap', () => {
    render(<Stack data-testid="stack" wrap>Content</Stack>)
    expect(screen.getByTestId('stack')).toHaveAttribute('data-wrap', 'true')
  })

  it('emits an explicit off value for wrap={false}', () => {
    render(<Stack data-testid="stack" wrap={false}>Content</Stack>)
    expect(screen.getByTestId('stack')).toHaveAttribute('data-wrap', 'false')
  })

  it('applies responsive wrap that turns off at a breakpoint', () => {
    render(<Stack data-testid="stack" wrap={{base: true, md: false}}>Content</Stack>)
    const el = screen.getByTestId('stack')
    expect(el).toHaveAttribute('data-wrap', 'true')
    expect(el).toHaveAttribute('data-wrap-md', 'false')
  })

  it('merges custom className', () => {
    render(<Stack data-testid="stack" className="custom">Content</Stack>)
    expect(screen.getByTestId('stack')).toHaveClass('custom')
  })

  it('applies responsive direction', () => {
    render(
      <Stack data-testid="stack" direction={{base: 'vertical', md: 'horizontal'}}>
        Content
      </Stack>,
    )
    const el = screen.getByTestId('stack')
    expect(el).toHaveAttribute('data-direction', 'vertical')
    expect(el).toHaveAttribute('data-direction-md', 'horizontal')
  })

  it('applies responsive gap', () => {
    render(
      <Stack data-testid="stack" gap={{base: 'sm', lg: 'xl'}}>
        Content
      </Stack>,
    )
    const el = screen.getByTestId('stack')
    expect(el).toHaveAttribute('data-gap', 'sm')
    expect(el).toHaveAttribute('data-gap-lg', 'xl')
  })

  it('applies responsive align and justify', () => {
    render(
      <Stack
        data-testid="stack"
        align={{base: 'start', md: 'center'}}
        justify={{base: 'start', lg: 'between'}}
      >
        Content
      </Stack>,
    )
    const el = screen.getByTestId('stack')
    expect(el).toHaveAttribute('data-align', 'start')
    expect(el).toHaveAttribute('data-align-md', 'center')
    expect(el).toHaveAttribute('data-justify', 'start')
    expect(el).toHaveAttribute('data-justify-lg', 'between')
  })
})

describe('Stack accessibility', () => {
  it('has no axe violations', async () => {
    const {container} = render(
      <Stack gap="md">
        <div>A</div>
        <div>B</div>
      </Stack>,
    )
    expect(
      await axe(container, {rules: {'color-contrast': {enabled: false}}}),
    ).toHaveNoViolations()
  })
})
