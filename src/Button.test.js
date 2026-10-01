import React from 'react'
import {shallow, mount} from 'enzyme'
import Button from './Button'

describe('Button', () => {
  it('should render without throwing', () => {
    shallow(<Button />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-Button'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Button className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('should handle props for different button types', () => {
    const button = shallow(<Button secondary />)

    expect(button.first().prop('className')).to.contain('secondary')
  })

  it('should correctly disable a button', () => {
    const htmlButton = mount(<Button disabled />)
      .find('button')
      .first()

    expect(htmlButton.prop('className')).to.contain('disabled')
    expect(htmlButton.prop('disabled')).to.equal(true)
  })

  it('defaults a plain button to type="button" so it does not submit a form', () => {
    const button = mount(<Button />).find('button').first()
    expect(button.prop('type')).to.equal('button')
  })

  it('keeps an explicit type when one is provided', () => {
    const button = mount(<Button type="submit" />).find('button').first()
    expect(button.prop('type')).to.equal('submit')
  })
})
