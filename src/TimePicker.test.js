import React from 'react'
import {shallow, mount} from 'enzyme'
import TimeContainer from './TimePicker/TimeContainer'
import TimePicker from './TimePicker'
import Input from './Input'
import sinon from 'sinon'

describe('TimePicker', () => {
  it('should render without throwing', () => {
    shallow(<TimePicker />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const input = shallow(<TimePicker className={testClassName} />).find(
      `.${testClassName}`
    )

    expect(input.exists()).to.equal(true)
  })

  it('should handle external time changes', () => {
    const input = mount(<TimePicker defaultValue="12:00" />)

    input.setProps({defaultValue: '12:00'})
    input.update()

    expect(
      input
        .find(Input)
        .first()
        .prop('defaultValue')
    ).to.equal('12:00')
  })

  it('should handle external time changes', () => {
    const spy = sinon.spy()
    const input = mount(<TimePicker defaultValue="12:00" onChange={spy} />)

    input
      .find('input')
      .first()
      .simulate('change', {target: {value: '12:00'}})
    input.update()

    expect(
      input
        .find(Input)
        .first()
        .prop('defaultValue')
    ).to.equal('12:00')
    expect(spy.called).to.equal(true)
  })

  it('should translate clicks on ticker buttons into changes', () => {
    const spy = sinon.spy()
    const input = mount(
      <TimePicker defaultValue="12:00" isOpen onChange={spy} />
    )

    input
      .find('.rev-TimeTicker')
      .find('button')
      .first()
      .simulate('click')

    expect(
      input
        .find(Input)
        .first()
        .prop('defaultValue')
    ).to.equal('13:00')
    expect(spy.called).to.equal(true)
  })

  it('opens the time tickers on focus and hides it on blur', () => {
    const focusSpy = sinon.spy()
    const blurSpy = sinon.spy()

    const input = mount(<TimePicker onBlur={blurSpy} onFocus={focusSpy} />)

    input
      .find('input')
      .first()
      .simulate('focus')
    input.update()

    expect(input.find(TimeContainer).prop('className')).to.contain(
      'rev-TimeContainer--open'
    )
    expect(focusSpy.called).to.equal(true)
    expect(blurSpy.called).to.equal(false)

    input
      .find('input')
      .first()
      .simulate('blur')
    input.update()

    expect(input.find(TimeContainer).prop('className')).to.contain(
      'rev-TimeContainer--closed'
    )
    expect(blurSpy.called).to.equal(true)
  })

  it('keeps the calendar open when you do not have focus, but the mouse is over', () => {
    const input = mount(<TimePicker />)

    input.find('input').simulate('focus')
    input.find('label').simulate('mouseOver')
    input.find('input').simulate('blur')
    input.update()

    expect(input.find(TimeContainer).prop('className')).to.contain(
      'rev-TimeContainer--open'
    )

    input.find('label').simulate('mouseOut')
    input.update()
    expect(input.find(TimeContainer).prop('className')).to.contain(
      'rev-TimeContainer--closed'
    )
  })
})
