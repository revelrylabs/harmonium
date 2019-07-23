import React from 'react'
import {shallow} from 'enzyme'
import Calendar from './Calendar'
import {DateTime, Duration} from 'luxon'

describe('Calendar', () => {
  it('should render without throwing', () => {
    shallow(<Calendar />)
  })

  it('defaults to today', () => {
    const calendar = shallow(<Calendar />)
    const monthString = DateTime.local().toLocaleString({
      month: 'short',
      year: 'numeric',
    })

    expect(calendar.find('.rev-Calendar-header-label').text()).to.contain(
      monthString
    )
  })

  it('treats invalid dates as today', () => {
    const calendar = shallow(<Calendar selectedDate="-05-17" />)
    const monthString = DateTime.local().toLocaleString({
      month: 'short',
      year: 'numeric',
    })

    expect(calendar.find('.rev-Calendar-header-label').text()).to.contain(
      monthString
    )
  })

  it('can advance a month backward', () => {
    const calendar = shallow(<Calendar />)

    calendar
      .find('.rev-Calendar-header-button--previous')
      .simulate('click', {preventDefault: () => null})
    const monthString = DateTime.local()
      // deals with the situation when you are on 5/31 and you step back one
      // month. Since there is no 4/31, luxon makes the date 5/1 instead. Every
      // month has a 1st, and we only need the month part for this test
      .startOf('month')
      .plus(Duration.fromObject({month: -1}))
      .toLocaleString({month: 'short', year: 'numeric'})

    expect(calendar.find('.rev-Calendar-header-label').text()).to.contain(
      monthString
    )
  })

  it('can advance a month forward', () => {
    const calendar = shallow(<Calendar />)

    calendar
      .find('.rev-Calendar-header-button--next')
      .simulate('click', {preventDefault: () => null})
    const monthString = DateTime.local()
      // deals with the situation when you are on 3/31 and you step forward one
      // month. Since there is no 4/31, luxon makes the date 5/1 instead. Every
      // month has a 1st, and we only need the month part for this test
      .startOf('month')
      .plus(Duration.fromObject({month: 1}))
      .toLocaleString({month: 'short', year: 'numeric'})

    expect(calendar.find('.rev-Calendar-header-label').text()).to.contain(
      monthString
    )
  })
})
