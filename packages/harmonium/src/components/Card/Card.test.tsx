import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Card, CardHeader, CardBody, CardFooter} from './Card'
import {configureAxe} from 'vitest-axe'
// jsdom has no layout, so colour contrast can't be computed here
const axe = configureAxe({rules: {'color-contrast': {enabled: false}}})


describe('Card', () => {
  it('renders children', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('defaults to elevated variant', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveAttribute('data-variant', 'elevated')
  })

  it('renders with sections', () => {
    render(
      <Card>
        <CardHeader data-testid="header">Header</CardHeader>
        <CardBody data-testid="body">Body</CardBody>
        <CardFooter data-testid="footer">Footer</CardFooter>
      </Card>,
    )
    expect(screen.getByTestId('header')).toHaveTextContent('Header')
    expect(screen.getByTestId('body')).toHaveTextContent('Body')
    expect(screen.getByTestId('footer')).toHaveTextContent('Footer')
  })

  it('applies variant and padding', () => {
    render(<Card data-testid="card" variant="outlined" padding="lg">Content</Card>)
    const el = screen.getByTestId('card')
    expect(el).toHaveAttribute('data-variant', 'outlined')
    expect(el).toHaveAttribute('data-padding', 'lg')
  })


  it('has no axe violations', async () => {
    const {container} = render(
      <Card>
        <CardHeader>Title</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
