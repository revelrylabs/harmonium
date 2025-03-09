import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Icon from './Icon'

// Mock console.warn
const originalConsoleWarn = console.warn
let consoleWarnMock: jest.SpyInstance

describe('Icon', () => {
  beforeEach(() => {
    consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation()
  })

  afterEach(() => {
    consoleWarnMock.mockRestore()
    console.warn = originalConsoleWarn
  })

  it('should render without throwing', () => {
    render(<Icon i="home" />)
    const icon = document.querySelector('.rev-Icon')
    expect(icon).toBeInTheDocument()
  })

  it('should add className to element', () => {
    const testClassName = '__TEST__'
    render(<Icon i="home" className={testClassName} />)
    
    const icon = document.querySelector('i')
    expect(icon).toHaveClass('rev-Icon')
    expect(icon).toHaveClass(testClassName)
  })

  it('should warn if the icon prop is used', () => {
    render(<Icon icon="home" />)
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'The `icon` property has been deprecated and will be removed in a future version. Please use <Icon i="icon-name" /> instead.'
    )
  })

  it('should include the icon name in the className', () => {
    render(<Icon i="home" />)
    const icon = document.querySelector('i')
    expect(icon).toHaveClass('home')
    expect(icon).toHaveClass('rev-Icon--home')
  })
}) 