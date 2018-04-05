import React from 'react'
import {shallow, mount} from 'enzyme'
import Calendar from './DatePicker/Calendar'
import DatePicker from './DatePicker'
import Input from './Input'
import sinon from 'sinon'

describe('DatePicker', () => {
  it('should render without throwing', () => {
    shallow(<DatePicker />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const input = shallow(<DatePicker className={testClassName} />).find(
      `.${testClassName}`
    )

    expect(input.exists()).to.equal(true)
  })

  it('should handle external date changes', () => {
    const input = mount(<DatePicker defaultValue="2018-03-12" />)

    input.setProps({defaultValue: '2018-08-05'})
    input.update()

    expect(input.find(Input).prop('defaultValue')).to.equal('2018-08-05')
  })

  it('should handle external date changes', () => {
    const spy = sinon.spy()
    const input = mount(<DatePicker defaultValue="2018-03-12" onChange={spy} />)

    input.find('input').simulate('change', {target: {value: '2018-08-05'}})
    input.update()

    expect(input.find(Input).prop('defaultValue')).to.equal('2018-08-05')
    expect(spy.called).to.equal(true)
  })

  it('should translate clicks on calendar cells into changes', () => {
    const spy = sinon.spy()
    const input = mount(
      <DatePicker defaultValue="2018-03-12" isOpen onChange={spy} />
    )

    input
      .find('.rev-Calendar-body-bodyCell')
      .find('button')
      .first()
      .simulate('click')

    expect(input.find(Input).prop('defaultValue')).to.equal('2018-02-25')
    expect(spy.called).to.equal(true)
  })

  it('opens the calendar on focus and hides it on blur', () => {
    const focusSpy = sinon.spy()
    const blurSpy = sinon.spy()

    const input = mount(<DatePicker onBlur={blurSpy} onFocus={focusSpy} />)

    input.find('input').simulate('focus')
    input.update()

    expect(input.find(Calendar).prop('className')).to.contain(
      'rev-Calendar--open'
    )
    expect(focusSpy.called).to.equal(true)
    expect(blurSpy.called).to.equal(false)

    input.find('input').simulate('blur')
    input.update()

    expect(input.find(Calendar).prop('className')).to.contain(
      'rev-Calendar--closed'
    )
    expect(blurSpy.called).to.equal(true)
  })

  it('keeps the calendar open when you do not have focus, but the mouse is over', () => {
    const input = mount(<DatePicker />)

    input.find('input').simulate('focus')
    input.find('label').simulate('mouseOver')
    input.find('input').simulate('blur')
    input.update()

    expect(input.find(Calendar).prop('className')).to.contain(
      'rev-Calendar--open'
    )

    input.find('label').simulate('mouseOut')
    input.update()
    expect(input.find(Calendar).prop('className')).to.contain(
      'rev-Calendar--closed'
    )
  })

  it('can make items not selectable', () => {
    const spy = sinon.spy()
    const input = mount(
      <DatePicker
        defaultValue="2018-03-12"
        isOpen
        onChange={spy}
        isSelectable={(date) => date.day !== 1}
      />
    )

    expect(
      input.find('.rev-Calendar-body-bodyCell--unselectable').exists()
    ).to.equal(true)

    input
      .find('.rev-Calendar-body-bodyCell--unselectable')
      .find('button')
      .first()
      .simulate('click')

    expect(input.find(Input).prop('defaultValue')).to.equal('2018-03-12')
    expect(spy.called).to.equal(false)
  })

  it('handles an array of highlights', () => {
    const input = mount(
      <DatePicker
        defaultValue="2018-03-12"
        highlights={['2018-03-15']}
        isOpen
      />
    )

    expect(
      input.find('.rev-Calendar-body-bodyCell--highlighted').exists()
    ).to.equal(true)
  })

  it('handles a hash of highlights', () => {
    const input = mount(
      <DatePicker
        defaultValue="2018-03-12"
        highlights={{'2018-03-15': '__TEST__'}}
        isOpen
      />
    )

    expect(input.find('.__TEST__').exists()).to.equal(true)
  })

  it('handles a highlight function (that returns a class)', () => {
    const input = mount(
      <DatePicker
        defaultValue="2018-03-12"
        highlights={(date) => (date.day % 2 === 0 ? '__TEST__' : '')}
        isOpen
      />
    )

    expect(input.find('.__TEST__').exists()).to.equal(true)
  })

  it('handles a highlight function (that returns a class)', () => {
    const input = mount(
      <DatePicker
        defaultValue="2018-03-12"
        highlights={(date) => date.day % 2 === 0}
        isOpen
      />
    )

    expect(
      input.find('.rev-Calendar-body-bodyCell--highlighted').exists()
    ).to.equal(true)
  })

  it('does overrides', () => {
    const overrideComponent = () => <span>AVeryUniqueString</span>
    const input = mount(
      <DatePicker
        overrides={{[DatePicker.Calendar]: overrideComponent}}
        isOpen
      />
    )

    expect(input.text()).to.contain('AVeryUniqueString')
  })
})
