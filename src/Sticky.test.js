import Sticky, {Sticky} from './Sticky'
import sinon from 'sinon'

describe('Sticky', () => {
  it('should render without throwing', () => {
    shallow(<Sticky><span>test</span></Sticky>)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-Sticky'
    const testClassName = '__TEST__'

    const childClassName = shallow(
      <Sticky className={testClassName}>
        <span>test</span>
      </Sticky>
    ).first().prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })
})

describe('Sticky.Stateful', () => {
  it('should render without throwing', () => {
    shallow(<Sticky.Stateful><span>test</span></Sticky.Stateful>)
  })
})
