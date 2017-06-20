import Currency from './Currency'

describe('Currency', () => {
  it('should render without throwing', () => {
    shallow(
      <Currency value={50} />
    )
  })
})
