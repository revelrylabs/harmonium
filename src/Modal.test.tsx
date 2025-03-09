import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from './Modal'

describe('Modal', () => {
  it('should render without throwing', () => {
    render(
      <Modal>
        <h2>Some Content</h2>
      </Modal>
    )
    expect(screen.getByText('Some Content')).toBeInTheDocument()
    expect(document.querySelector('.rev-Modal')).toBeInTheDocument()
  })

  it('should render with isOpen prop', () => {
    render(
      <Modal isOpen>
        <h2>Some Content</h2>
      </Modal>
    )
    expect(document.querySelector('.rev-Modal--open')).toBeInTheDocument()
  })

  it('handles background clicks without onBackgroundClick prop', () => {
    render(
      <Modal isOpen>
        <h2>Some Content</h2>
      </Modal>
    )
    
    const background = document.querySelector('.rev-Modal-background')
    if (!background) throw new Error('Background element not found')
    
    // Initially it should be open
    expect(document.querySelector('.rev-Modal--open')).toBeInTheDocument()
    
    // After clicking background, it should close
    fireEvent.click(background)
    
    expect(document.querySelector('.rev-Modal--closed')).toBeInTheDocument()
  })

  it('handles background clicks with onBackgroundClick prop', () => {
    const handleClick = jest.fn()
    render(
      <Modal isOpen onBackgroundClick={handleClick}>
        <h2>Some Content</h2>
      </Modal>
    )
    
    const background = document.querySelector('.rev-Modal-background')
    if (!background) throw new Error('Background element not found')
    
    // Initially it should be open
    expect(document.querySelector('.rev-Modal--open')).toBeInTheDocument()
    
    // After clicking background, it should close and call the handler
    fireEvent.click(background)
    
    expect(document.querySelector('.rev-Modal--closed')).toBeInTheDocument()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
}) 