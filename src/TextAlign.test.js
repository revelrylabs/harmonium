import TextAlign from './TextAlign'

describe('TextAlign', () => {
  it('should render without throwing', () => {
    shallow(
      <TextAlign right><p>right</p></TextAlign>
    )
  })
})
