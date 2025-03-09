import React from 'react'
import { render } from '@testing-library/react'
import Breadcrumbs from './Breadcrumbs'

describe('Breadcrumbs', () => {
  it('should render without throwing', () => {
    render(<Breadcrumbs />)
    // Should render without errors
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    const { container } = render(<Breadcrumbs className={testClassName} />)
    
    const breadcrumbs = container.querySelector('ul')
    expect(breadcrumbs).toHaveClass('Breadcrumbs')
    expect(breadcrumbs).toHaveClass(testClassName)
  })

  it('should render the children', () => {
    const { container } = render(
      <Breadcrumbs>
        <Breadcrumbs.Item>Home</Breadcrumbs.Item>
        <Breadcrumbs.Item>About</Breadcrumbs.Item>
      </Breadcrumbs>
    )
    
    const items = container.querySelectorAll('.Breadcrumbs-item')
    expect(items.length).toBe(2)
  })

  it('should handle boolean props correctly', () => {
    const { container: containerCenter } = render(<Breadcrumbs center />)
    expect(containerCenter.querySelector('ul')).toHaveClass('Breadcrumbs--center')
    
    const { container: containerJustified } = render(<Breadcrumbs justified />)
    expect(containerJustified.querySelector('ul')).toHaveClass('Breadcrumbs--justified')
    
    const { container: containerRight } = render(<Breadcrumbs right />)
    expect(containerRight.querySelector('ul')).toHaveClass('Breadcrumbs--right')
  })
})

describe('Breadcrumbs.Item', () => {
  it('should render without throwing', () => {
    render(<Breadcrumbs.Item>Test</Breadcrumbs.Item>)
    // Should render without errors
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    const { container } = render(<Breadcrumbs.Item className={testClassName}>Test</Breadcrumbs.Item>)
    
    const item = container.querySelector('li')
    expect(item).toHaveClass('Breadcrumbs-item')
    expect(item).toHaveClass(testClassName)
  })

  it('should handle selected prop', () => {
    const { container } = render(<Breadcrumbs.Item selected>Selected</Breadcrumbs.Item>)
    
    const item = container.querySelector('li')
    expect(item).toHaveClass('Breadcrumbs-item--selected')
  })

  it('should handle disabled prop', () => {
    const { container } = render(<Breadcrumbs.Item disabled>Disabled</Breadcrumbs.Item>)
    
    const item = container.querySelector('li')
    expect(item).toHaveClass('Breadcrumbs-item--disabled')
  })
}) 