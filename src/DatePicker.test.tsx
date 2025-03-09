import React from 'react'
import { shallow, mount } from 'enzyme'
import DatePicker from './DatePicker'
import { DateTime } from 'luxon'

describe('DatePicker', () => {
  it('should render without throwing', () => {
    shallow(<DatePicker />)
  })

  it('should add className to child', () => {
    const testClassName = 'test-class'
    const input = shallow(<DatePicker className={testClassName} />).find('label')

    expect(input.hasClass(testClassName)).toBe(true)
  })

  it('should handle the defaultValue prop', () => {
    const testDate = '2018-01-01'
    const component = shallow(<DatePicker defaultValue={testDate} />)

    expect(component.state('isoValue')).toEqual(testDate)
  })

  it('should handle the value prop', () => {
    const testDate = '2018-01-01'
    const component = shallow(<DatePicker value={testDate} />)

    expect(component.state('isoValue')).toEqual(testDate)
  })

  it('should handle the dateFormat prop', () => {
    const testFormat = 'yyyy/MM/dd'
    const testDate = '2018-01-01'
    const component = mount(<DatePicker dateFormat={testFormat} defaultValue={testDate} />)
    
    // The input value should be formatted according to the dateFormat
    const formatted = DateTime.fromISO(testDate).toFormat(testFormat)
    expect(component.state('formattedValue')).toEqual(formatted)
  })

  it('should trigger onChange callbacks', () => {
    const spy = jest.fn()
    const component = mount(<DatePicker onChange={spy} />)
    
    // Simulate a change event
    component.find('input').simulate('change', { target: { value: '01/01/2018' } })
    
    expect(spy).toHaveBeenCalled()
  })

  it('should handle the isSelectable prop', () => {
    const isSelectable = (date: DateTime) => date.day !== 1 // Disallow the first day of the month
    const component = mount(<DatePicker isSelectable={isSelectable} />)
    
    // The isSelectable prop should be passed to the Calendar component
    expect(component.find('Calendar').prop('isSelectable')).toEqual(isSelectable)
  })

  it('should handle the isOpen prop', () => {
    const component = mount(<DatePicker isOpen={true} />)
    
    // The calendar should have the open class when isOpen is true
    expect(component.find('.rev-Calendar--open').length).toBe(1)
  })

  it('should handle the highlights prop', () => {
    const highlights = ['2018-01-01', '2018-01-15', '2018-01-30']
    const component = mount(<DatePicker highlights={highlights} />)
    
    // The highlights prop should be passed to the Calendar component
    expect(component.find('Calendar').prop('highlights')).toEqual(highlights)
  })
}) 