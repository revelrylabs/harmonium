import Card from './Card'

describe('Card', () => {
  it('should render without throwing', () => {
    shallow(
      <Card>
        <Card.Header>Header content</Card.Header>
          <Card.Fill>
            <p>etc</p>
          </Card.Fill>
        <Card.Footer>Footer content</Card.Footer>
      </Card>
    )
  })
})
