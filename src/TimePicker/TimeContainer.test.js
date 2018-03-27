import TimeContainer from './TimeContainer'
import {DateTime, Duration} from 'luxon'
import sinon from 'sinon'
import timekeeper from 'timekeeper'

describe('TimeContainer', () => {
  it('should render without throwing', () => {
    shallow(<TimeContainer />)
  })

  it('defaults to the current time', () => {
    const container = shallow(<TimeContainer />)

    const testHour = DateTime.local().hour % 12
    const testMinute = DateTime.local().minute
    const testMeridiem = DateTime.local().hour >= 12 ? 'PM' : 'AM'
    const testTimeString = `${testHour}:${testMinute} ${testMeridiem}`

    const hour = container.state().time.hour % 12
    const minute = container.state().time.minute
    const meridiem = container.state().time.hour >= 12 ? 'PM' : 'AM'
    const timeString = `${hour}:${minute} ${meridiem}`

    expect(timeString).to.equal(testTimeString)
  })

  it('treats invalid times as the current time', () => {
    const container = shallow(<TimeContainer selectedTime="05 : 17" />)

    const testHour = DateTime.local().hour % 12
    const testMinute = DateTime.local().minute
    const testMeridiem = DateTime.local().hour >= 12 ? 'PM' : 'AM'
    const testTimeString = `${testHour}:${testMinute} ${testMeridiem}`

    const hour = container.state().time.hour % 12
    const minute = container.state().time.minute
    const meridiem = container.state().time.hour >= 12 ? 'PM' : 'AM'
    const timeString = `${hour}:${minute} ${meridiem}`

    expect(timeString).to.equal(testTimeString)
  })

  it('can advance an hour backward', () => {
    const container = mount(<TimeContainer />)

    container
      .find('button.rev-TimeTicker-button--previous')
      .first()
      .simulate('click', {preventDefault: () => null})
    const testTime = DateTime.local().minus(Duration.fromObject({hours: 1}))
    const testHour = (testTime.hour % 12 ? testTime.hour % 12 : 12).toString()
    // cast time text to number to unformat 0 in front of single digits so that test passes for single digits
    const hour = (+container
      .find('.rev-TimeTicker-value')
      .first()
      .text()).toString()

    expect(hour).to.equal(testHour)
  })

  it('can advance an hour forward', () => {
    const container = mount(<TimeContainer />)

    container
      .find('button.rev-TimeTicker-button--next')
      .first()
      .simulate('click', {preventDefault: () => null})
    const testTime = DateTime.local().plus(Duration.fromObject({hours: 1}))
    const testHour = (testTime.hour % 12 ? testTime.hour % 12 : 12).toString()
    // cast time text to number to unformat 0 in front of single digits so that test passes for single digits
    const hour = (+container
      .find('.rev-TimeTicker-value')
      .first()
      .text()).toString()

    expect(hour).to.equal(testHour)
  })

  it('can advance a minute backward', () => {
    const container = mount(<TimeContainer />)

    container
      .find('button.rev-TimeTicker-button--previous')
      .at(1)
      .simulate('click', {preventDefault: () => null})
    const testTime = DateTime.local().minus(Duration.fromObject({minutes: 1}))
    const testMinute = testTime.minute.toString()
    // cast time text to number to unformat 0 in front of single digits so that test passes for single digits
    const minute = (+container
      .find('.rev-TimeTicker-value')
      .at(1)
      .text()).toString()

    expect(minute).to.equal(testMinute)
  })

  it('can advance a minute forward', () => {
    const container = mount(<TimeContainer />)

    container
      .find('button.rev-TimeTicker-button--next')
      .at(1)
      .simulate('click', {preventDefault: () => null})
    const testTime = DateTime.local().plus(Duration.fromObject({minutes: 1}))
    const testMinute = testTime.minute.toString()
    // cast time text to number to unformat 0 in front of single digits so that test passes for single digits
    const minute = (+container
      .find('.rev-TimeTicker-value')
      .at(1)
      .text()).toString()

    expect(minute).to.equal(testMinute)
  })

  it('can advance a second backward', () => {
    const container = mount(<TimeContainer showSeconds />)

    container
      .find('button.rev-TimeTicker-button--previous')
      .at(2)
      .simulate('click', {preventDefault: () => null})
    const testTime = DateTime.local().minus(Duration.fromObject({seconds: 1}))
    const testSecond = testTime.second.toString()
    // cast time text to number to unformat 0 in front of single digits so that test passes for single digits
    const second = (+container
      .find('.rev-TimeTicker-value')
      .at(2)
      .text()).toString()

    expect(second).to.equal(testSecond)
  })

  it('can advance a second forward', () => {
    timekeeper.freeze(new Date())
    const testTime = DateTime.local().plus(Duration.fromObject({seconds: 1}))
    const testSecond = testTime.second.toString()
    const container = mount(<TimeContainer showSeconds />)

    container
      .find('button.rev-TimeTicker-button--next')
      .at(2)
      .simulate('click', {preventDefault: () => null})

    // cast time text to number to unformat 0 in front of single digits so that test passes for single digits
    const second = (+container
      .find('.rev-TimeTicker-value')
      .at(2)
      .text()).toString()

    timekeeper.reset()

    expect(second).to.equal(testSecond)
  })

  it('can advance AM/PM backward', () => {
    const container = mount(<TimeContainer />)

    container
      .find('button.rev-TimeTicker-button--previous')
      .last()
      .simulate('click', {preventDefault: () => null})
    const testTime = DateTime.local().minus(Duration.fromObject({hour: 12}))
    const testMeridiem = testTime.hour >= 12 ? 'PM' : 'AM'
    const meridiem = container
      .find('.rev-TimeTicker-value')
      .last()
      .text()

    expect(meridiem).to.equal(testMeridiem)
  })

  it('can advance AM/PM forward', () => {
    const container = mount(<TimeContainer />)

    container
      .find('button.rev-TimeTicker-button--next')
      .last()
      .simulate('click', {preventDefault: () => null})
    const testTime = DateTime.local().plus(Duration.fromObject({hour: 12}))
    const testMeridiem = testTime.hour >= 12 ? 'PM' : 'AM'
    const meridiem = container
      .find('.rev-TimeTicker-value')
      .last()
      .text()

    expect(meridiem).to.equal(testMeridiem)
  })
})
