import React from 'react'
import { render, screen } from '@testing-library/react'
import BrowserSupportWarning from './BrowserSupportWarning'

describe('BrowserSupportWarning', () => {
  it('should not render when browser is supported', () => {
    // Mock a modern Chrome user agent that would pass most minimum versions
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
    
    const { container } = render(
      <BrowserSupportWarning 
        userAgent={userAgent} 
        minVersions={{ chrome: '70' }}
      >
        Your browser is not supported. Please upgrade.
      </BrowserSupportWarning>
    )
    
    // The component should return null when browser is supported
    expect(container.firstChild).toBeNull()
  })
  
  it('should render when browser is not supported', () => {
    // Mock an old Chrome user agent that wouldn't pass the minimum version
    const userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36'
    const warningText = 'Your browser is not supported. Please upgrade.'
    
    render(
      <BrowserSupportWarning 
        userAgent={userAgent} 
        minVersions={{ chrome: '70' }}
      >
        {warningText}
      </BrowserSupportWarning>
    )
    
    // The component should render when browser is not supported
    expect(screen.getByText(warningText)).toBeInTheDocument()
  })
  
  it('should apply custom className', () => {
    // Mock an old Chrome user agent that wouldn't pass the minimum version
    const userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36'
    const customClass = 'custom-warning'
    
    const { container } = render(
      <BrowserSupportWarning 
        userAgent={userAgent}
        minVersions={{ chrome: '70' }}
        className={customClass}
      >
        Warning message
      </BrowserSupportWarning>
    )
    
    const warningElement = container.firstChild
    expect(warningElement).toHaveClass('rev-BrowserSupportWarning')
    expect(warningElement).toHaveClass(customClass)
  })
}) 