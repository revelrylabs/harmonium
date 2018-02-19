import TimeContainer from './TimeContainer'
import { DateTime } from 'luxon'
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
})
