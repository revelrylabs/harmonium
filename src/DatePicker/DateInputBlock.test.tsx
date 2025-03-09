import React from 'react'
import { shallow, mount } from 'enzyme'
import DateInputBlock from './DateInputBlock'

describe('DateInputBlock', () => {
  it('should render without throwing', () => {
    shallow(<DateInputBlock />)
  })

  it('should add className to child', () => {
    const testClassName = 'test-class'
    const component = shallow(<DateInputBlock className={testClassName} />)
    const input = component.find('Input').first()

    expect(input.prop('className')).toContain(testClassName)
  })

  it('should render a visible input with the correct type when goodDateInput is true', () => {
    const component = shallow(<DateInputBlock goodDateInput={true} name="test-date" />)
    const input = component.find('Input').first()
    
    expect(input.prop('type')).toEqual('date')
    expect(input.prop('name')).toEqual('test-date')
    
    // Should not render a hidden input
    expect(component.find('Input')).toHaveLength(1)
  })

  it('should render a visible and hidden input when goodDateInput is false', () => {
    const component = shallow(
      <DateInputBlock 
        goodDateInput={false} 
        name="test-date" 
        isoValue="2018-01-01" 
        formattedValue="01/01/2018"
      />
    )
    
    // Should have two inputs
    expect(component.find('Input')).toHaveLength(2)
    
    // Visible input
    const visibleInput = component.find('Input').first()
    expect(visibleInput.prop('type')).toEqual('text')
    expect(visibleInput.prop('name')).toBeNull()
    expect(visibleInput.prop('defaultValue')).toEqual('01/01/2018')
    
    // Hidden input
    const hiddenInput = component.find('Input').last()
    expect(hiddenInput.prop('type')).toEqual('hidden')
    expect(hiddenInput.prop('name')).toEqual('test-date')
    expect(hiddenInput.prop('value')).toEqual('2018-01-01')
    expect(hiddenInput.prop('readOnly')).toBe(true)
  })

  it('should set invalid classes when error prop is provided', () => {
    const component = shallow(<DateInputBlock error={true} />)
    const input = component.find('Input').first()
    
    expect(input.prop('className')).toContain('is-invalid-input')
    expect(input.prop('className')).toContain('is-invalid')
  })

  it('should pass on other props to the input', () => {
    const onChangeSpy = jest.fn()
    const component = shallow(<DateInputBlock onChange={onChangeSpy} />)
    
    component.find('Input').first().simulate('change')
    
    expect(onChangeSpy).toHaveBeenCalled()
  })
}) 