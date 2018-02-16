import Loader from './Loader'

const props = {}

describe('Loader', () => {
  it('will shallow render without throwing', () => {
    expect(() => shallow(<Loader {...props} />)).not.to.throw()
  })

  it('will render without throwing', () => {
    expect(() => mount(<Loader {...props} />)).not.to.throw()
  })

  it('renders a small variation if prop small is specified as true', () => {})

  it('renders a large variation if prop large is specified as true', () => {})

  it('throws an error if both small={true} and large={true} are specified as props', () => {})
})
