import Pluralize from './Pluralize'

describe('Pluralize', () => {
  it('should render without throwing', () => {
    shallow(
      <Pluralize one="mouse" count={1}/>
    )
  })
})
