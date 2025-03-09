import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import StatelessDrawer from './StatelessDrawer'

describe('StatelessDrawer', () => {
  it('should render without throwing', () => {
    render(<StatelessDrawer />)
    // Should render without errors
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    const { container } = render(<StatelessDrawer className={testClassName} />)
    
    const element = container.firstChild
    expect(element).toHaveClass(testClassName)
  })

  it('should handle boolean props correctly', () => {
    const { container: leftContainer } = render(<StatelessDrawer left />)
    expect(leftContainer.firstChild).toHaveClass('rev-Drawer--left')
    
    const { container: rightContainer } = render(<StatelessDrawer right />)
    expect(rightContainer.firstChild).toHaveClass('rev-Drawer--right')
    
    const { container: topContainer } = render(<StatelessDrawer top />)
    expect(topContainer.firstChild).toHaveClass('rev-Drawer--top')
  })

  it('should call close function when closer is clicked', () => {
    const mockClose = jest.fn()
    const { getByText } = render(
      <StatelessDrawer close={mockClose} closerChildren="Close Drawer">
        <div>Drawer Content</div>
      </StatelessDrawer>
    )
    
    fireEvent.click(getByText('Close Drawer'))
    expect(mockClose).toHaveBeenCalled()
  })

  it('should call expand function when expander is clicked', () => {
    const mockExpand = jest.fn()
    const { getByText } = render(
      <StatelessDrawer expand={mockExpand} expanderChildren="Open Drawer">
        <div>Drawer Content</div>
      </StatelessDrawer>
    )
    
    fireEvent.click(getByText('Open Drawer'))
    expect(mockExpand).toHaveBeenCalled()
  })

  it('should render open state correctly', () => {
    const { container } = render(
      <StatelessDrawer open>
        <div>Drawer Content</div>
      </StatelessDrawer>
    )
    
    expect(container.querySelector('.rev-Expander--expanded')).toBeInTheDocument()
    expect(container.textContent).toContain('Drawer Content')
  })

  it('should use custom expander component class', () => {
    const { getByText } = render(
      <StatelessDrawer expanderComponentClass="button" expanderChildren="Open Drawer">
        <div>Drawer Content</div>
      </StatelessDrawer>
    )
    
    const button = getByText('Open Drawer')
    expect(button.tagName).toBe('BUTTON')
  })
}) 