import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Slider from './Slider'

describe('Slider', () => {
  it('renders without throwing', () => {
    render(<Slider />)
    expect(document.querySelector('.rev-Slider')).toBeInTheDocument()
  })

  it('renders a range input and a text input', () => {
    render(<Slider />)
    
    const rangeInput = document.querySelector('input[type="range"]')
    const textInput = document.querySelector('input[type="text"]')
    
    expect(rangeInput).toBeInTheDocument()
    expect(textInput).toBeInTheDocument()
    expect(rangeInput).toHaveClass('rev-Slider-range')
    expect(textInput).toHaveClass('rev-Slider-input')
  })

  it('sets initial value correctly', () => {
    const initialValue = 50
    render(<Slider initialValue={initialValue} />)
    
    const rangeInput = document.querySelector('input[type="range"]') as HTMLInputElement
    const textInput = document.querySelector('input[type="text"]') as HTMLInputElement
    
    expect(Number(rangeInput.value)).toBe(initialValue)
    expect(Number(textInput.value)).toBe(initialValue)
  })

  it('sets min, max, and step attributes', () => {
    const min = 10
    const max = 90
    const step = 5
    
    render(<Slider min={min} max={max} step={step} />)
    
    const rangeInput = document.querySelector('input[type="range"]') as HTMLInputElement
    
    expect(Number(rangeInput.min)).toBe(min)
    expect(Number(rangeInput.max)).toBe(max)
    expect(Number(rangeInput.step)).toBe(step)
  })

  it('updates value when range input changes', () => {
    render(<Slider initialValue={20} />)
    
    const rangeInput = document.querySelector('input[type="range"]') as HTMLInputElement
    const textInput = document.querySelector('input[type="text"]') as HTMLInputElement
    
    fireEvent.change(rangeInput, { target: { value: '50' } })
    
    expect(Number(rangeInput.value)).toBe(50)
    expect(Number(textInput.value)).toBe(50)
  })

  it('updates value when text input changes', () => {
    render(<Slider initialValue={20} />)
    
    const rangeInput = document.querySelector('input[type="range"]') as HTMLInputElement
    const textInput = document.querySelector('input[type="text"]') as HTMLInputElement
    
    fireEvent.change(textInput, { target: { value: '75' } })
    
    expect(Number(rangeInput.value)).toBe(75)
    expect(Number(textInput.value)).toBe(75)
  })

  it('constraints text input value to min and max', () => {
    const min = 10
    const max = 90
    
    render(<Slider min={min} max={max} initialValue={20} />)
    
    const textInput = document.querySelector('input[type="text"]') as HTMLInputElement
    
    // Test value beyond max
    fireEvent.change(textInput, { target: { value: '100' } })
    expect(Number(textInput.value)).toBe(max)
    
    // Test value below min
    fireEvent.change(textInput, { target: { value: '5' } })
    expect(Number(textInput.value)).toBe(min)
  })

  it('falls back to min value for invalid input', () => {
    const min = 10
    render(<Slider min={min} initialValue={20} />)
    
    const textInput = document.querySelector('input[type="text"]') as HTMLInputElement
    
    // Test invalid input (non-numeric)
    fireEvent.change(textInput, { target: { value: 'abc' } })
    expect(Number(textInput.value)).toBe(min)
  })

  it('calls onChange callback with the new value', () => {
    const onChangeMock = jest.fn()
    render(<Slider onChange={onChangeMock} />)
    
    const rangeInput = document.querySelector('input[type="range"]') as HTMLInputElement
    
    fireEvent.change(rangeInput, { target: { value: '50' } })
    
    expect(onChangeMock).toHaveBeenCalledWith(50)
  })
}) 