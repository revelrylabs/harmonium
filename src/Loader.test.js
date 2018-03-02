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

  it('renders a medium variation if prop medium is specified as true', () => {})

  it('renders a large variation if prop large is specified as true', () => {})

  it('renders a huge variation if prop huge is specified as true', () => {})

  it('assigns a variation on animation-duration when duration prop is specified', () => {
    const wrapper = shallow(<Loader duration="600ms" />)

    expect(wrapper.props().style.animationDuration).to.equal('600ms')
  })

  it('assigns a variation on border-top-color when color prop is specified', () => {
    const wrapper = shallow(<Loader color="#000000" />)

    expect(wrapper.props().style.borderTopColor).to.equal('#000000')
  })

  it('assigns a variation on border-color when secondaryColor prop is specified', () => {
    const wrapper = shallow(<Loader secondaryColor="#FFFFFF" />)

    expect(wrapper.props().style.borderColor).to.equal('#FFFFFF')
  })

  it('throws an error if more than one size-related prop is specified', () => {
    // Construct props wherein more than one size attribute is specified.
    const customProps = { ...props, small: true, medium: true }

    expect(() => shallow(<Loader {...customProps} />)).to.throw()
  })
})
