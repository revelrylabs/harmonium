import Tabs from './Tabs'

describe('Tabs', () => {
  it('should render without throwing', () => {
    shallow(<Tabs><Tabs.Item contentKey={1} title="One" /></Tabs>)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-Tabs'
    const testClassName = '__TEST__'

    const childClassName = shallow(
      <Tabs className={testClassName}>
        <Tabs.Item contentKey={1} title="One" />
      </Tabs>
    ).first().prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })
})
