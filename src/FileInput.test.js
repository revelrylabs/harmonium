import FileInput from './FileInput'
import sinon from 'sinon'

describe('FileInput', () => {
  it('should render without throwing', () => {
    shallow(<FileInput />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<FileInput className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })

  it('can handle changes with onChange handler', () => {
    const spy = sinon.spy()
    const input = mount(<FileInput onChange={spy} />)

    input.find('input').simulate('change', {currentTarget: {value: 'C:\\fakepath\\snack-falcon.jpg'}})

    expect(spy.called).to.eq(true)
  })

  it('can handle changes with onChange handler', () => {
    const input = mount(<FileInput />)

    input.find('input').simulate('change', {currentTarget: {value: 'C:\\fakepath\\snack-falcon.jpg'}})
  })
})

describe('FileInput.Stack', () => {
  it('should render without throwing', () => {
    shallow(<FileInput.Stack />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<FileInput.Stack className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})
