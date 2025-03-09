import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Drawer from './Drawer'

describe('Drawer', () => {
  it('should render without throwing', () => {
    render(<Drawer />)
    // Should render without errors
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    const { container } = render(<Drawer className={testClassName} />)
    
    const element = container.firstChild
    expect(element).toHaveClass('rev-Drawer')
    expect(element).toHaveClass(testClassName)
  })

  it('should handle boolean props correctly', () => {
    const { container: leftContainer } = render(<Drawer left />)
    expect(leftContainer.firstChild).toHaveClass('rev-Drawer--left')
    
    const { container: rightContainer } = render(<Drawer right />)
    expect(rightContainer.firstChild).toHaveClass('rev-Drawer--right')
    
    const { container: topContainer } = render(<Drawer top />)
    expect(topContainer.firstChild).toHaveClass('rev-Drawer--top')
  })

  it('should open when clicked', () => {
    const { container, getByText } = render(
      <Drawer expanderChildren="Open Drawer">
        <div>Drawer Content</div>
      </Drawer>
    )
    
    // Initially not expanded
    expect(container.querySelector('.rev-Expander--expanded')).not.toBeInTheDocument()
    
    // Click to expand
    fireEvent.click(getByText('Open Drawer'))
    
    // Now expanded
    expect(container.querySelector('.rev-Expander--expanded')).toBeInTheDocument()
    expect(container.textContent).toContain('Drawer Content')
  })

  it('should close when closer is clicked', () => {
    const { container, getByText } = render(
      <Drawer open closerChildren="Close Drawer">
        <div>Drawer Content</div>
      </Drawer>
    )
    
    // Initially expanded
    expect(container.querySelector('.rev-Expander--expanded')).toBeInTheDocument()
    
    // Click to close
    fireEvent.click(getByText('Close Drawer'))
    
    // Now not expanded
    expect(container.querySelector('.rev-Expander--expanded')).not.toBeInTheDocument()
  })
}) 