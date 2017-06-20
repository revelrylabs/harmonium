import Progress from './Progress'

describe('Progress', () => {
  it('should render without throwing', () => {
    shallow(
      <Progress value={40} />
    )
  })
})
