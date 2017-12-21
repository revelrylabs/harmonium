import Accordion from './Accordion'
import sinon from 'sinon'

describe('Accordion', () => {
  it('should render without throwing', () => {
    shallow(<Accordion><Accordion.Item contentKey={1} title="One" /></Accordion>)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-Accordion'
    const testClassName = '__TEST__'

    const childClassName = shallow(
      <Accordion className={testClassName}>
        <Accordion.Item contentKey={1} title="One" />
      </Accordion>
    ).first().prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('should handle single active items', () => {
    const childProp = shallow(
      <Accordion active={1}>
        <Accordion.Item contentKey={1} title="One" />
      </Accordion>
    ).children().first().prop('active')

    expect(childProp).to.eq(true)
  })

  it('should handle multiple active items (with array)', () => {
    shallow(
      <Accordion active={[1,2]}>
        <Accordion.Item contentKey={1} title="One" />
        <Accordion.Item contentKey={2} title="Two" />
      </Accordion>
    ).children().forEach((item) => {
      const childProp = item.prop('active')

      expect(childProp).to.eq(true)
    })
  })

  it('should handle multiple active items (with an object)', () => {
    const component = mount(
      <Accordion active={{1: true, 2: true}}>
        <Accordion.Item contentKey={1} title="One">first</Accordion.Item>
        <Accordion.Item contentKey={2} title="Two">second</Accordion.Item>
      </Accordion>
    )

    expect(component.text()).to.include('first')
    expect(component.text()).to.include('second')
  })
})

describe('Accordion.Stateful', () => {
  it('should render without throwing', () => {
    let component = mount(<Accordion.Stateful><Accordion.Item contentKey={1} title="One" /></Accordion.Stateful>)
    let instance = component.instance()
    instance.toggleActiveStatus(1)
    instance.setExclusivelyActive(1)
    instance.toggleActiveStatus(1)
    instance.toggleActiveStatus(1)
    instance.toggleActiveStatus(1)
    instance.setExclusivelyActive(1)
    instance.setExclusivelyActive(1)
  })

  it('can handle clicks', () => {
    let spy = sinon.spy()
    let component = mount(<Accordion.Stateful><Accordion.Item contentKey={1} title="One" onClick={spy} /></Accordion.Stateful>)
    let child = component.find(Accordion.Item).instance()
    let fakeEvent = {preventDefault: () => null }
    child.props.onClick(fakeEvent)

    expect(component.update().state('active')['1']).to.eq(true)
    expect(spy.called).to.eq(true)
  })
})
