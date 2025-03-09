import React from 'react'
import { render } from '@testing-library/react'
import Expander from './Expander'

describe('Expander', () => {
  it('should render without throwing', () => {
    render(<Expander />)
    // Should render without errors
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    const { container } = render(<Expander className={testClassName} />)
    
    const element = container.firstChild
    expect(element).toHaveClass('rev-Expander')
    expect(element).toHaveClass(testClassName)
  })

  it('should render expanded when open prop is true', () => {
    const { container } = render(<Expander open />)
    
    const element = container.firstChild
    expect(element).toHaveClass('rev-Expander--expanded')
  })

  it('should not render expanded when open prop is false or undefined', () => {
    const { container: container1 } = render(<Expander open={false} />)
    expect(container1.firstChild).not.toHaveClass('rev-Expander--expanded')
    
    const { container: container2 } = render(<Expander />)
    expect(container2.firstChild).not.toHaveClass('rev-Expander--expanded')
  })

  it('should render children', () => {
    const { getByText } = render(
      <Expander>
        <div>Test Content</div>
      </Expander>
    )
    
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('should render closer element', () => {
    const closerText = 'Close Me'
    const { getByText } = render(
      <Expander closer={<button>{closerText}</button>}>
        <div>Test Content</div>
      </Expander>
    )
    
    expect(getByText(closerText)).toBeInTheDocument()
  })
}) 