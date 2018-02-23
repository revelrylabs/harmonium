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

  it('assigns a variation on animation-duration when duration prop is specified', () => {})

  it('assigns a variation on border-color-top when color prop is specified', () => {})

  it('assigns a variation on border-color when secondaryColor prop is specified', () => {})

  it('throws an error if more than one size-related prop is specified', () => {
    // Construct props wherein more than one size attribute is specified.
    const customProps = { ...props, small: true, medium: true }

    expect(() => shallow(<Loader {...customProps} />)).to.throw()
  })
})
