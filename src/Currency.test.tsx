import React from 'react'
import { render } from '@testing-library/react'
import Currency from './Currency'

describe('Currency', () => {
  it('should render without throwing', () => {
    render(<Currency value={1000} />)
    // Should render without errors
  })

  it('should format values as currency', () => {
    const { container } = render(<Currency value={1000} />)
    // This will format $1,000.00 in USD by default
    expect(container.textContent).toContain('$1,000.00')
  })

  it('should respect custom currency', () => {
    const { container } = render(<Currency value={1000} currency="EUR" />)
    // This will format €1,000.00 for EUR
    expect(container.textContent).toContain('€1,000.00')
  })

  it('should pass through props to NumberFormatter', () => {
    // Testing with a specific locale
    const { container } = render(
      <Currency value={1000} locale="de-DE" currency="EUR" />
    )
    // In German format, should use dots as thousand separators and comma as decimal separator
    expect(container.textContent).toContain('1.000,00')
  })
}) 