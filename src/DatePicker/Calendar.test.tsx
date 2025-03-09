import React from 'react'
import { shallow, mount } from 'enzyme'
import Calendar from './Calendar'
import { DateTime } from 'luxon'

describe('Calendar', () => {
  it('should render without throwing', () => {
    shallow(<Calendar isSelectable={() => true} />)
  })

  it('should add className to child', () => {
    const testClassName = 'test-class'
    const calendar = shallow(<Calendar className={testClassName} isSelectable={() => true} />)

    expect(calendar.hasClass(testClassName)).toBe(true)
  })

  it('should handle the selectedDate prop', () => {
    const testDate = '2018-01-01'
    const component = shallow(<Calendar selectedDate={testDate} isSelectable={() => true} />)

    // The selectedDate should be used to set the initial state
    expect(component.state('date').toISODate()).toEqual(testDate)
  })

  it('should handle the dateChanger prop', () => {
    const spy = jest.fn()
    const component = mount(<Calendar dateChanger={spy} isSelectable={() => true} />)
    
    // Simulate a click on a day that is selectable
    component.find('button').first().simulate('click')
    
    expect(spy).toHaveBeenCalled()
  })

  it('should handle the isSelectable prop', () => {
    const isSelectable = (date: DateTime) => date.day !== 1 // Disallow the first day of the month
    const component = mount(<Calendar isSelectable={isSelectable} />)
    
    // Find all days that are the first of the month
    const firstDaysOfMonth = component.find('CalendarDay').findWhere(
      (n) => n.props().date && n.props().date.day === 1
    )
    
    // Check that these days are not selectable
    firstDaysOfMonth.forEach((node) => {
      expect(node.props().isSelectable(node.props().date)).toBe(false)
    })
  })

  it('should handle the overlay prop', () => {
    const component = shallow(<Calendar overlay isSelectable={() => true} />)
    
    expect(component.hasClass('rev-Calendar--overlay')).toBe(true)
  })

  it('should handle the highlights prop', () => {
    const today = DateTime.local().toISODate()
    const highlights = [today]
    const component = mount(<Calendar highlights={highlights} isSelectable={() => true} />)
    
    // Find the today's date cell
    const todayCell = component.find('CalendarDay').findWhere(
      (n) => n.props().date && n.props().date.toISODate() === today
    )
    
    // Check that today's cell has the highlight class
    expect(todayCell.render().hasClass('rev-Calendar-body-bodyCell--highlighted')).toBe(true)
  })

  it('should navigate months when clicking next/previous buttons', () => {
    const component = mount(<Calendar isSelectable={() => true} />)
    const initialMonth = component.state('date').month
    
    // Click the next month button
    component.find('.rev-Calendar-header-button--next').simulate('click')
    
    // Month should be incremented
    const newMonth = component.state('date').month
    expect(newMonth).toEqual(initialMonth === 12 ? 1 : initialMonth + 1)
  })
}) 