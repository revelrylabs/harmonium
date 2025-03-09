import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('should render without throwing', () => {
    render(<Checkbox />)
    // Should render without errors
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    const { container } = render(<Checkbox className={testClassName} />)
    
    const label = container.querySelector('label')
    expect(label).toHaveClass('rev-Checkbox')
    expect(label).toHaveClass(testClassName)
  })

  it('should render the label text', () => {
    const labelText = 'Check this option'
    const { container } = render(<Checkbox label={labelText} />)
    
    const labelSpan = container.querySelector('.rev-Checkbox-label')
    expect(labelSpan).toHaveTextContent(labelText)
  })

  it('should apply error classes when error prop is provided', () => {
    const { container } = render(<Checkbox error="This field has an error" />)
    
    const label = container.querySelector('label')
    const input = container.querySelector('input')
    
    expect(label).toHaveClass('is-invalid')
    expect(input).toHaveClass('is-invalid-input')
    expect(input).toHaveClass('is-invalid')
  })

  it('should handle boolean styling props', () => {
    const { container: stackedContainer } = render(<Checkbox stacked />)
    expect(stackedContainer.querySelector('label')).toHaveClass('rev-Checkbox--stacked')
    
    const { container: smallContainer } = render(<Checkbox stackedForSmall />)
    expect(smallContainer.querySelector('label')).toHaveClass('rev-Checkbox--stackedForSmall')
    
    const { container: mediumContainer } = render(<Checkbox stackedForMedium />)
    expect(mediumContainer.querySelector('label')).toHaveClass('rev-Checkbox--stackedForMedium')
  })
})

describe('Checkbox.Fieldset', () => {
  const options = [
    { label: 'Left', value: 'L' }, 
    { label: 'Right', value: 'R' }
  ]

  it('should render without throwing', () => {
    render(<Checkbox.Fieldset options={options} />)
    // Should render without errors
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    const { container } = render(
      <Checkbox.Fieldset className={testClassName} options={options} />
    )
    
    const fieldset = container.querySelector('fieldset')
    expect(fieldset).toHaveClass('rev-CheckboxFieldset')
    expect(fieldset).toHaveClass(testClassName)
  })

  it('handles the controlled case', () => {
    const { container } = render(
      <Checkbox.Fieldset options={options} value={['L']} />
    )

    const inputs = container.querySelectorAll('input')
    expect(inputs[0]).toBeChecked()
    expect(inputs[1]).not.toBeChecked()
  })

  it('handles default values', () => {
    const { container } = render(
      <Checkbox.Fieldset options={options} defaultValue={['L']} />
    )

    const inputs = container.querySelectorAll('input')
    expect(inputs[0]).toBeChecked()
    expect(inputs[1]).not.toBeChecked()
  })

  it('handles onChange events', () => {
    const onChange = jest.fn()
    const { container } = render(
      <Checkbox.Fieldset options={options} onChange={onChange} />
    )

    const firstInput = container.querySelectorAll('input')[0]
    fireEvent.click(firstInput)
    
    expect(onChange).toHaveBeenCalled()
  })
}) 