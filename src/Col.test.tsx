import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Col from './Col'

describe('Col', () => {
  it('should render without throwing', () => {
    render(<Col>Col Content</Col>)
    expect(document.querySelector('.rev-Col')).toBeInTheDocument()
  })

  it('should add className to element', () => {
    const testClassName = '__TEST__'
    render(<Col className={testClassName}>Col Content</Col>)
    
    const col = document.querySelector('.rev-Col')
    expect(col).toHaveClass('rev-Col')
    expect(col).toHaveClass(testClassName)
  })

  it('handles column number props', () => {
    const propToClass: Record<string, string> = {
      small: 'rev-Col--small1',
      medium: 'rev-Col--medium1',
      large: 'rev-Col--large1',
      smallOffset: 'rev-Col--smallOffset1',
      mediumOffset: 'rev-Col--mediumOffset1',
      largeOffset: 'rev-Col--largeOffset1',
      smallPush: 'rev-Col--smallPush1',
      mediumPush: 'rev-Col--mediumPush1',
      largePush: 'rev-Col--largePush1',
      smallPull: 'rev-Col--smallPull1',
      mediumPull: 'rev-Col--mediumPull1',
      largePull: 'rev-Col--largePull1',
      smallOrder: 'rev-Col--smallOrder1',
      mediumOrder: 'rev-Col--mediumOrder1',
      largeOrder: 'rev-Col--largeOrder1',
    }

    for (const key in propToClass) {
      if (Object.prototype.hasOwnProperty.call(propToClass, key)) {
        const value = propToClass[key]
        const props = { [key]: 1 }
        const { container } = render(<Col {...props}>Col Content</Col>)
        
        expect(container.querySelector(`.${value}`)).toBeInTheDocument()
      }
    }
  })

  it('handles boolean props', () => {
    render(<Col smallCentered>Col Content</Col>)
    const col = document.querySelector('.rev-Col')
    expect(col).toHaveClass('rev-Col--smallCentered')
  })
  
  it('handles multiple boolean props', () => {
    render(<Col shrink alignCenter>Col Content</Col>)
    const col = document.querySelector('.rev-Col')
    expect(col).toHaveClass('rev-Col--shrink')
    expect(col).toHaveClass('rev-Col--alignCenter')
  })
}) 