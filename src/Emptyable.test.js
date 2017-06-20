import Emptyable from './Emptyable'

describe('Emptyable', () => {
  it('should render without throwing', () => {
    shallow(
      <Emptyable componentClass="ul" emptyState={<strong>No items</strong>} />
    )
  })
})
