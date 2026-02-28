import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import {
  PricingTable,
  PricingCard,
  PricingCardHeader,
  PricingCardPrice,
  PricingCardFeatures,
  PricingCardFeature,
  PricingCardFooter,
} from './PricingTable'

describe('PricingTable', () => {
  it('renders children', () => {
    render(
      <PricingTable data-testid="table">
        <div>Plan</div>
      </PricingTable>,
    )
    expect(screen.getByTestId('table')).toHaveTextContent('Plan')
  })

  it('merges custom className', () => {
    render(
      <PricingTable data-testid="table" className="custom">
        Content
      </PricingTable>,
    )
    expect(screen.getByTestId('table')).toHaveClass('custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn<(el: HTMLDivElement | null) => void>()
    render(<PricingTable ref={ref}>Content</PricingTable>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })
})

describe('PricingCard', () => {
  it('renders children', () => {
    render(<PricingCard data-testid="card">Plan content</PricingCard>)
    expect(screen.getByTestId('card')).toHaveTextContent('Plan content')
  })

  it('applies featured data attribute', () => {
    render(
      <PricingCard data-testid="card" featured>
        Content
      </PricingCard>,
    )
    expect(screen.getByTestId('card')).toHaveAttribute('data-featured')
  })

  it('does not set data-featured when false', () => {
    render(<PricingCard data-testid="card">Content</PricingCard>)
    expect(screen.getByTestId('card')).not.toHaveAttribute('data-featured')
  })
})

describe('PricingCardPrice', () => {
  it('renders amount', () => {
    render(<PricingCardPrice amount="$29" />)
    expect(screen.getByText('$29')).toBeInTheDocument()
  })

  it('renders period when provided', () => {
    render(<PricingCardPrice amount="$29" period="/month" />)
    expect(screen.getByText('/month')).toBeInTheDocument()
  })

  it('does not render period when not provided', () => {
    const {container} = render(<PricingCardPrice amount="$0" />)
    expect(container.querySelectorAll('span')).toHaveLength(1)
  })
})

describe('PricingCardFeature', () => {
  it('renders children', () => {
    render(<PricingCardFeature>Unlimited storage</PricingCardFeature>)
    expect(screen.getByText('Unlimited storage')).toBeInTheDocument()
  })

  it('defaults to included', () => {
    render(
      <PricingCardFeature data-testid="feature">Feature</PricingCardFeature>,
    )
    expect(screen.getByTestId('feature')).toHaveAttribute(
      'data-included',
      'true',
    )
  })

  it('renders as not included', () => {
    render(
      <PricingCardFeature data-testid="feature" included={false}>
        Feature
      </PricingCardFeature>,
    )
    expect(screen.getByTestId('feature')).toHaveAttribute(
      'data-included',
      'false',
    )
  })
})

describe('Full pricing card composition', () => {
  it('renders a complete pricing card', () => {
    render(
      <PricingTable>
        <PricingCard featured>
          <PricingCardHeader>Pro</PricingCardHeader>
          <PricingCardPrice amount="$29" period="/month" />
          <PricingCardFeatures>
            <PricingCardFeature>Unlimited projects</PricingCardFeature>
            <PricingCardFeature included={false}>
              Custom domain
            </PricingCardFeature>
          </PricingCardFeatures>
          <PricingCardFooter>
            <button>Get Started</button>
          </PricingCardFooter>
        </PricingCard>
      </PricingTable>,
    )
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('$29')).toBeInTheDocument()
    expect(screen.getByText('/month')).toBeInTheDocument()
    expect(screen.getByText('Unlimited projects')).toBeInTheDocument()
    expect(screen.getByText('Custom domain')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: 'Get Started'}),
    ).toBeInTheDocument()
  })
})
