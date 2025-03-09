import React from 'react'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('should render without throwing', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    const { container } = render(<Badge className={testClassName}>Test Badge</Badge>)
    
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('rev-Badge')
    expect(badge).toHaveClass(testClassName)
  })

  it('should accept a badge type prop', () => {
    const { container } = render(<Badge secondary>Test Badge</Badge>)
    
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('rev-Badge--secondary')
  })

  it('should render with an icon', () => {
    render(<Badge icon="home">Test Badge</Badge>)
    
    const iconElement = screen.getByText('Test Badge').previousSibling
    expect(iconElement).toBeInTheDocument()
  })

  it('should support multiple badge types', () => {
    const { container } = render(
      <Badge primary success>
        Test Badge
      </Badge>
    )
    
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('rev-Badge--primary')
    expect(badge).toHaveClass('rev-Badge--success')
  })
}) 