import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import StatelessModal from './StatelessModal'

describe('StatelessModal', () => {
  it('can render without error when closed', () => {
    render(
      <StatelessModal>
        <div>Hello</div>
      </StatelessModal>
    )
    
    expect(document.querySelector('.rev-Modal')).toBeInTheDocument()
    expect(document.querySelector('.rev-Modal--closed')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('can render without error when open', () => {
    render(
      <StatelessModal isOpen>
        <div>Hello</div>
      </StatelessModal>
    )
    
    expect(document.querySelector('.rev-Modal')).toBeInTheDocument()
    expect(document.querySelector('.rev-Modal--open')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('handles background clicks', () => {
    const handleClick = jest.fn()
    render(
      <StatelessModal isOpen onBackgroundClick={handleClick}>
        <div>Hello</div>
      </StatelessModal>
    )
    
    const background = document.querySelector('.rev-Modal-background')
    if (!background) throw new Error('Background element not found')
    
    fireEvent.click(background)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard events on background', () => {
    const handleKeyPress = jest.fn()
    render(
      <StatelessModal isOpen onBackgroundClick={handleKeyPress}>
        <div>Hello</div>
      </StatelessModal>
    )
    
    const background = document.querySelector('.rev-Modal-background')
    if (!background) throw new Error('Background element not found')
    
    fireEvent.keyPress(background, { key: 'Enter', code: 'Enter' })
    
    expect(handleKeyPress).toHaveBeenCalledTimes(1)
  })

  it('adds custom className', () => {
    const customClass = 'custom-modal-class'
    render(
      <StatelessModal className={customClass}>
        <div>Hello</div>
      </StatelessModal>
    )
    
    const modal = document.querySelector('.rev-Modal')
    expect(modal).toHaveClass(customClass)
  })
}) 