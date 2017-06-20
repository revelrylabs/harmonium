import CardLayout from './CardLayout'

describe('CardLayout', () => {
  it('should render without throwing', () => {
    shallow(
      <CardLayout>
        <CardLayout.Bar />
        <CardLayout.Fill />
      </CardLayout>
    )
  })
})
