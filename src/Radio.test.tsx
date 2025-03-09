import React from 'react'
import { render, screen } from '@testing-library/react'
import Radio from './Radio'

describe('Radio', () => {
  it('should render without throwing', () => {
    render(<Radio />)
    expect(document.querySelector('.rev-Radio')).toBeInTheDocument()
  })

  it('should add className to component', () => {
    const testClassName = '__TEST__'
    render(<Radio className={testClassName} />)
    
    const radio = document.querySelector('.rev-Radio')
    expect(radio).toHaveClass('rev-Radio')
    expect(radio).toHaveClass(testClassName)
  })

  it('should render the label', () => {
    render(<Radio label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('should apply error styling', () => {
    render(<Radio error />)
    
    const radio = document.querySelector('.rev-Radio')
    const input = document.querySelector('.rev-Radio-input')
    expect(radio).toHaveClass('is-invalid')
    expect(input).toHaveClass('is-invalid-input')
    expect(input).toHaveClass('is-invalid')
  })
})

describe('Radio.Fieldset', () => {
  const options = [
    { label: 'Left', value: 'L' },
    { label: 'Right', value: 'R' }
  ]

  it('should render without throwing', () => {
    render(<Radio.Fieldset options={options} />)
    expect(document.querySelector('.rev-RadioFieldset')).toBeInTheDocument()
  })

  it('should add className to component', () => {
    const testClassName = '__TEST__'
    render(<Radio.Fieldset className={testClassName} options={options} />)
    
    const fieldset = document.querySelector('.rev-RadioFieldset')
    expect(fieldset).toHaveClass('rev-RadioFieldset')
    expect(fieldset).toHaveClass(testClassName)
  })

  it('should render all options', () => {
    render(<Radio.Fieldset options={options} />)
    
    expect(screen.getByText('Left')).toBeInTheDocument()
    expect(screen.getByText('Right')).toBeInTheDocument()
    
    const radioInputs = document.querySelectorAll('input[type="radio"]')
    expect(radioInputs).toHaveLength(2)
    expect(radioInputs[0]).toHaveValue('L')
    expect(radioInputs[1]).toHaveValue('R')
  })

  it('can handle the controlled case', () => {
    render(<Radio.Fieldset value="L" options={options} />)
    
    const radioInputs = document.querySelectorAll('input[type="radio"]')
    expect(radioInputs[0]).toBeChecked()
    expect(radioInputs[1]).not.toBeChecked()
  })

  it('can handle default values', () => {
    render(<Radio.Fieldset defaultValue="R" options={options} />)
    
    const radioInputs = document.querySelectorAll('input[type="radio"]')
    expect(radioInputs[0]).not.toBeChecked()
    expect(radioInputs[1]).toBeChecked()
  })

  it('renders label and help text', () => {
    render(
      <Radio.Fieldset 
        options={options}
        label="Test Label"
        help="Help Text"
      />
    )
    
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Help Text')).toBeInTheDocument()
  })

  it('displays error messages', () => {
    render(<Radio.Fieldset options={options} error="Error message" />)
    
    expect(screen.getByText('Error message')).toBeInTheDocument()
    expect(document.querySelector('.is-invalid-fieldset')).toBeInTheDocument()
  })
}) 