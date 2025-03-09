import React from 'react'
import { render, screen } from '@testing-library/react'
import TopBar from './TopBar'

describe('TopBar', () => {
  it('should render without throwing', () => {
    render(<TopBar />)
    expect(document.querySelector('.rev-TopBar')).toBeInTheDocument()
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    render(<TopBar className={testClassName} />)
    
    const topBar = document.querySelector('.rev-TopBar')
    expect(topBar).toHaveClass('rev-TopBar')
    expect(topBar).toHaveClass(testClassName)
  })

  it('handles boolean styling props', () => {
    render(<TopBar breakpointMedium />)
    
    const topBar = document.querySelector('.rev-TopBar')
    expect(topBar).toHaveClass('rev-TopBar-breakpoint--mediumDown')
  })

  it('renders children correctly', () => {
    render(
      <TopBar>
        <div data-testid="test-child">Test Child</div>
      </TopBar>
    )
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })
})

describe('TopBar.Item', () => {
  it('should render without throwing', () => {
    render(<TopBar.Item />)
    expect(document.querySelector('.rev-TopBar-item')).toBeInTheDocument()
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    render(<TopBar.Item className={testClassName} />)
    
    const topBarItem = document.querySelector('.rev-TopBar-item')
    expect(topBarItem).toHaveClass('rev-TopBar-item')
    expect(topBarItem).toHaveClass(testClassName)
  })

  it('handles scroll props', () => {
    render(<TopBar.Item scroll scrollSmall />)
    
    const topBarItem = document.querySelector('.rev-TopBar-item')
    expect(topBarItem).toHaveClass('rev-TopBar-item--scroll')
    expect(topBarItem).toHaveClass('rev-TopBar-item--scroll--smallOnly')
  })
}) 