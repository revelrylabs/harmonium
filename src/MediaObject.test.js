import MediaObject from './MediaObject'

describe('MediaObject', () => {
  it('should render without throwing', () => {
    shallow(<MediaObject />)
  })

  it('it handles boolean props', () => {
    const mediaObject = shallow(<MediaObject center />)

    expect(mediaObject.prop('className')).to.contain('align-center')
  })
})

describe('MediaObjectSection', () => {
  it('should render without throwing', () => {
    shallow(<MediaObject.Section />)
  })

  it('it handles boolean props', () => {
    const mediaObject = shallow(<MediaObject.Section center />)

    expect(mediaObject.prop('className')).to.contain('align-self-center')
  })
})
