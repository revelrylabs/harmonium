import Modal from './Modal'

describe('Modal', () => {
  it('should render without throwing', () => {
    shallow(<Modal><h2>Some Content</h2></Modal>)
  })
})
