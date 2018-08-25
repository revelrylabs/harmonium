import Brand from './Brand'
import React from 'react'
import {shallow} from 'enzyme'

const props = {}

describe('Brand', () => {
  it('should render without throwing', () => {
    expect(() => shallow(<Brand {...props} />)).not.to.throw()
  })

  it('should set the "src" attribute on the image element', () => {
    const path = 'path/to/image'
    const brand = shallow(<Brand imagePath={path} />)

    expect(brand.find('img').getElement().props.src).to.equal(path)
  })

  it('should set the "alt" tag on the image element', () => {
    const altText = 'screen reader text'
    const brand = shallow(<Brand altTag={altText} />)

    expect(brand.find('img').getElement().props.alt).to.equal(altText)
  })

  it('should set the link on the anchor element', () => {
    const link = '/some/example/link'
    const brand = shallow(<Brand linkPath={link} />)

    expect(brand.find('a').getElement().props.href).to.equal(link)
  })
})
