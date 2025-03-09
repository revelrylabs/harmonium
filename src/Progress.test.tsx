import React from 'react'
import { render, screen } from '@testing-library/react'
import Progress from './Progress'

describe('Progress', () => {
  it('renders without throwing', () => {
    render(<Progress value={50} />)
    expect(document.querySelector('.rev-Progress')).toBeInTheDocument()
  })

  it('should add className to component', () => {
    const testClassName = '__TEST__'
    render(<Progress className={testClassName} value={50} />)
    
    const progress = document.querySelector('.rev-Progress')
    expect(progress).toHaveClass('rev-Progress')
    expect(progress).toHaveClass('progress')
    expect(progress).toHaveClass(testClassName)
  })

  it('should calculate width based on value, min, and max', () => {
    render(<Progress min={0} max={100} value={50} data-testid="progress" />)
    
    const progressAmount = document.querySelector('.rev-Progress-track-amount')
    expect(progressAmount).toHaveStyle('width: 50%')
  })

  it('should handle values beyond max', () => {
    render(<Progress min={0} max={100} value={150} data-testid="progress" />)
    
    const progressAmount = document.querySelector('.rev-Progress-track-amount')
    expect(progressAmount).toHaveStyle('width: 100%')
  })

  it('should handle values below min', () => {
    render(<Progress min={50} max={100} value={25} data-testid="progress" />)
    
    const progressAmount = document.querySelector('.rev-Progress-track-amount')
    expect(progressAmount).toHaveStyle('width: 0%')
  })

  it('should handle custom min and max ranges', () => {
    render(<Progress min={100} max={200} value={150} data-testid="progress" />)
    
    const progressAmount = document.querySelector('.rev-Progress-track-amount')
    expect(progressAmount).toHaveStyle('width: 50%')
  })

  it('should render text when children are provided', () => {
    render(<Progress value={50}>Loading 50%</Progress>)
    
    expect(screen.getByText('Loading 50%')).toBeInTheDocument()
    expect(document.querySelector('.rev-Progress-text')).toBeInTheDocument()
  })

  it('should apply primary style', () => {
    render(<Progress value={50} primary />)
    
    const progress = document.querySelector('.rev-Progress')
    expect(progress).toHaveClass('rev-Progress--primary')
  })

  it('should apply secondary style', () => {
    render(<Progress value={50} secondary />)
    
    const progress = document.querySelector('.rev-Progress')
    expect(progress).toHaveClass('rev-Progress--secondary')
  })

  it('should apply success style', () => {
    render(<Progress value={50} success />)
    
    const progress = document.querySelector('.rev-Progress')
    expect(progress).toHaveClass('rev-Progress--success')
  })

  it('should apply warning style', () => {
    render(<Progress value={50} warning />)
    
    const progress = document.querySelector('.rev-Progress')
    expect(progress).toHaveClass('rev-Progress--warning')
  })

  it('should apply alert style', () => {
    render(<Progress value={50} alert />)
    
    const progress = document.querySelector('.rev-Progress')
    expect(progress).toHaveClass('rev-Progress--alert')
  })
}) 