import Brand from './Brand'
import React from 'react'
import {shallow} from 'enzyme'

const props = {}

describe('Brand', () => {
  it('will shallow render without throwing', () => {
    expect(() => shallow(<Brand {...props} />)).not.to.throw()
  })

  it('will set the src on the img element', () => {
    const brand = shallow(<Brand imagePath="path/to/image" />)

    expect(brand.find('img').html()).to.equal(
      '<img class="ref-Brand-img" src="path/to/image"/>'
    )
  })

  it('will set the alt tag on the img element', () => {
    const brand = shallow(<Brand altTag="screen reader text" />)

    expect(brand.find('img').html()).to.equal(
      '<img class="ref-Brand-img" alt="screen reader text"/>'
    )
  })

  it('will set the link url on the anchor element', () => {
    const brand = shallow(<Brand linkPath="/example" />)

    expect(brand.find('a').html()).to.equal(
      '<a href="/example" class="rev-Brand"><img class="ref-Brand-img"/></a>'
    )
  })
})
