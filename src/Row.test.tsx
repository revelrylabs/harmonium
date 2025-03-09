import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Row from './Row'

describe('Row', () => {
  it('should render without throwing', () => {
    render(<Row>Row Content</Row>)
    expect(document.querySelector('.rev-Row')).toBeInTheDocument()
  })

  it('should add className to element', () => {
    const testClassName = '__TEST__'
    render(<Row className={testClassName}>Row Content</Row>)
    
    const row = document.querySelector('.rev-Row')
    expect(row).toHaveClass('rev-Row')
    expect(row).toHaveClass(testClassName)
  })

  it('handles numerical props', () => {
    const { container } = render(<Row smallUp={1}>Row Content</Row>)
    expect(container.querySelector('.rev-Row--smallUp1')).toBeInTheDocument()
    
    const { container: container2 } = render(<Row mediumUp={1}>Row Content</Row>)
    expect(container2.querySelector('.rev-Row--mediumUp1')).toBeInTheDocument()
    
    const { container: container3 } = render(<Row largeUp={1}>Row Content</Row>)
    expect(container3.querySelector('.rev-Row--largeUp1')).toBeInTheDocument()
  })

  it('handles boolean props', () => {
    render(<Row collapse>Row Content</Row>)
    const row = document.querySelector('.rev-Row')
    expect(row).toHaveClass('rev-Row--collapse')
  })
  
  it('handles multiple boolean props', () => {
    render(<Row flex alignCenter>Row Content</Row>)
    const row = document.querySelector('.rev-Row')
    expect(row).toHaveClass('rev-Row--flex')
    expect(row).toHaveClass('rev-Row--alignCenter')
  })
}) 