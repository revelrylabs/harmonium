import React from 'react'
import { render } from '@testing-library/react'
import Emptyable from './Emptyable'

describe('Emptyable', () => {
  it('should render children when present', () => {
    const { container, getByText } = render(
      <Emptyable emptyState={<div>No content available</div>}>
        <div>Content is here!</div>
      </Emptyable>
    )
    
    expect(getByText('Content is here!')).toBeInTheDocument()
    expect(container.textContent).not.toContain('No content available')
  })

  it('should render emptyState when children are not present', () => {
    const { getByText } = render(
      <Emptyable emptyState={<div>No content available</div>} />
    )
    
    expect(getByText('No content available')).toBeInTheDocument()
  })

  it('should use custom componentClass when specified', () => {
    const { container } = render(
      <Emptyable componentClass="section" emptyState={<div>No content available</div>}>
        <div>Content is here!</div>
      </Emptyable>
    )
    
    const section = container.firstChild
    expect(section?.nodeName).toBe('SECTION')
  })

  it('should pass additional props to componentClass', () => {
    const testId = 'test-emptyable'
    const { getByTestId } = render(
      <Emptyable data-testid={testId} emptyState={<div>No content available</div>}>
        <div>Content is here!</div>
      </Emptyable>
    )
    
    expect(getByTestId(testId)).toBeInTheDocument()
  })
}) 