import Visibility from './Visibility'

describe('Visibility', () => {
  it('should render without throwing', () => {
    shallow(
      <Visibility showForLarge><span>showForLarge</span></Visibility>
    )
  })
})
