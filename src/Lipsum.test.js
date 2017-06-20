import Lipsum from './Lipsum'


describe('Lipsum', () => {
  it('should render without throwing', () => {
    shallow(
      <Lipsum p={1} />
    )
  })
})
