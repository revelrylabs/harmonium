import MediaObject from './MediaObject'

describe('MediaObject', () => {
  it('should render without throwing', () => {
    shallow(<MediaObject />)
  })
})

describe('MediaObjectSection', () => {
  it('should render without throwing', () => {
    shallow(<MediaObject.Section />)
  })
})
