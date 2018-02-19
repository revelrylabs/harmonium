import TimeContainer from './TimeContainer'
import { DateTime, Duration } from 'luxon'
import sinon from 'sinon'

describe('TimeContainer', () => {
  it('should render without throwing', () => {
    shallow(<TimeContainer />)
  })

  it('defaults to the current time', () => {
    const container = shallow(<TimeContainer />)

    const testHour = DateTime.local().hour % 12
    const testMinute = DateTime.local().minute
    const testMeridiem = DateTime.local().hour >= 12 ? 'PM' : 'AM'
    const testTimeString = testHour + ':' + testMinute + ' ' + testMeridiem

    const hour = container.state().time.hour % 12
    const minute = DateTime.local().minute
    const meridiem = DateTime.local().hour >= 12 ? 'PM' : 'AM'
    const timeString = hour + ':' + minute + ' ' + meridiem

    expect(timeString).to.equal(testTimeString)
  })

  it('treats invalid times as the current time', () => {
    const container = shallow(<TimeContainer selectedTime="05 : 17" />)

    const testHour = DateTime.local().hour % 12
    const testMinute = DateTime.local().minute
    const testMeridiem = DateTime.local().hour >= 12 ? 'PM' : 'AM'
    const testTimeString = testHour + ':' + testMinute + ' ' + testMeridiem

    const hour = container.state().time.hour % 12
    const minute = DateTime.local().minute
    const meridiem = DateTime.local().hour >= 12 ? 'PM' : 'AM'
    const timeString = hour + ':' + minute + ' ' + meridiem

    expect(timeString).to.equal(testTimeString)
  })

  it('can advance an hour backward', () => {
    const container = mount(<TimeContainer />)
    container
      .find('button.rev-TimeTicker-button--previous')
      .first()
      .simulate('click', { preventDefault: () => null })
    const testTime = DateTime.local().minus(Duration.fromObject({ hour: 1 }))
    const testHour = (testTime.hour % 12 ? testTime.hour % 12 : 12).toString()
    const hour = container.find('.rev-TimeTicker-value').first().text()

    expect(hour).to.equal(testHour)
  })

  it('can advance an hour forward', () => {
    const container = mount(<TimeContainer />)
    container
      .find('button.rev-TimeTicker-button--next')
      .first()
      .simulate('click', { preventDefault: () => null })
    const testTime = DateTime.local().plus(Duration.fromObject({ hour: 1 }))
    const testHour = (testTime.hour % 12 ? testTime.hour % 12 : 12).toString()
    const hour = container.find('.rev-TimeTicker-value').first().text()

    expect(hour).to.equal(testHour)
  })

  it('can advance a minute backward', () => {
    const container = mount(<TimeContainer />)
    container
      .find('button.rev-TimeTicker-button--previous')
      .at(1)
      .simulate('click', { preventDefault: () => null })
    const testMinute = (DateTime.local()
      .minus(Duration.fromObject({ minute: 1 })).minute).toString()
    const minute = container.find('.rev-TimeTicker-value').at(1).text()

    expect(minute).to.equal(testMinute)
  })

  it('can advance a minute forward', () => {
    const container = mount(<TimeContainer />)
    container
      .find('button.rev-TimeTicker-button--next')
      .at(1)
      .simulate('click', { preventDefault: () => null })
    const testMinute = (DateTime.local()
      .plus(Duration.fromObject({ minute: 1 })).minute).toString()
    const minute = container.find('.rev-TimeTicker-value').at(1).text()

    expect(minute).to.equal(testMinute)
  })
})
