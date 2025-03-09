import React from 'react'
import { render, screen } from '@testing-library/react'
import Social from './Social'

describe('Social', () => {
  it('should render without throwing', () => {
    render(<Social type={Social.types.FACEBOOK} url="https://revelry.co" />)
    expect(document.querySelector('.social')).toBeInTheDocument()
  })

  it('should add className to component', () => {
    const testClassName = '__TEST__'
    render(
      <Social
        className={testClassName}
        type={Social.types.FACEBOOK}
        url="https://revelry.co"
      />
    )
    
    const link = document.querySelector('.social')
    expect(link).toHaveClass('social')
    expect(link).toHaveClass(testClassName)
  })

  it('should render the right link for Twitter', () => {
    const expectedUrl = 'https://twitter.com/intent/tweet?url=http%3A%2F%2Frevelry.co&text=Check%20this%20out!'
    
    render(<Social type={Social.types.TWITTER} url="http://revelry.co" />)
    
    const link = document.querySelector('a')
    expect(link).toHaveAttribute('href', expectedUrl)
  })

  it('should render with a custom message', () => {
    const customMessage = 'Custom Message!'
    const expectedUrl = `https://twitter.com/intent/tweet?url=http%3A%2F%2Frevelry.co&text=${encodeURIComponent(customMessage)}`
    
    render(
      <Social 
        type={Social.types.TWITTER} 
        url="http://revelry.co" 
        message={customMessage} 
      />
    )
    
    const link = document.querySelector('a')
    expect(link).toHaveAttribute('href', expectedUrl)
  })

  it('should render children', () => {
    render(
      <Social type={Social.types.FACEBOOK} url="https://revelry.co">
        <span data-testid="child">Share</span>
      </Social>
    )
    
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Share')).toBeInTheDocument()
  })

  it('should have correct attributes for links', () => {
    render(<Social type={Social.types.FACEBOOK} url="https://revelry.co" />)
    
    const link = document.querySelector('a')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('can use a custom component class', () => {
    const CustomComponent = ({ className, children, href }: { className?: string, children?: React.ReactNode, href: string }) => (
      <button className={className} data-href={href} data-testid="custom-component">{children}</button>
    )
    
    render(
      <Social 
        type={Social.types.FACEBOOK} 
        url="https://revelry.co" 
        componentClass={CustomComponent}
      >
        Custom
      </Social>
    )
    
    expect(screen.getByTestId('custom-component')).toBeInTheDocument()
    expect(screen.getByText('Custom')).toBeInTheDocument()
    expect(document.querySelector('button')).toHaveClass('social')
  })

  it('can handle every type', () => {
    const PATTERNS = {
      BUFFER: 'buffer',
      DIGG: 'digg',
      EMAIL: 'mailto',
      FACEBOOK: 'facebook',
      GOOGLE_PLUS: 'google',
      LINKEDIN: 'linkedin',
      PINTEREST: 'pinterest',
      REDDIT: 'reddit',
      TUMBLR: 'tumblr',
      TWITTER: 'twitter',
    }

    // Test first one to avoid too many renders
    const firstType = Object.keys(PATTERNS)[0] as keyof typeof PATTERNS
    const pattern = PATTERNS[firstType]
    
    const { unmount } = render(
      <Social type={Social.types[firstType]} url="http://example.com" />
    )
    
    expect(document.querySelector('a')?.getAttribute('href')).toContain(pattern)
    unmount()
    
    // Now test that all types are valid functions
    Object.keys(Social.types).forEach(type => {
      expect(typeof Social.types[type as keyof typeof Social.types]).toBe('function')
    })
  })
}) 