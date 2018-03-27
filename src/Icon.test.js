import Icon from './Icon'
import sinon from 'sinon'

describe('Icon', () => {
  it('should render without throwing', () => {
    shallow(<Icon />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Icon className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })

  it('should warn if the icon prop is used', () => {
    const mock = sinon
      .mock(console)
      .expects('warn')
      .atLeast(1)

    shallow(<Icon icon="home" />)
    mock.verify()
  })
})
