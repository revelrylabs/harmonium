import Loader from './Loader'

const props = {}

describe('Loader', () => {
  it('will shallow render without throwing', () => {
    expect(() => shallow(<Loader {...props} />)).not.to.throw()
  })

  it('will render without throwing', () => {
    expect(() => mount(<Loader {...props} />)).not.to.throw()
  })

  it('renders a small variation if prop "small" is specified as true', () => {
    const wrapper = shallow(<Loader small />)

    expect(wrapper.hasClass('rev-Loader--small')).to.equal(true)
  })

  it('renders a medium variation if prop "medium" is specified as true', () => {
    const wrapper = shallow(<Loader medium />)

    expect(wrapper.hasClass('rev-Loader--medium')).to.equal(true)
  })

  it('renders a large variation if prop "large" is specified as true', () => {
    const wrapper = shallow(<Loader large />)

    expect(wrapper.hasClass('rev-Loader--large')).to.equal(true)
  })

  it('renders a huge variation if prop "huge" is specified as true', () => {
    const wrapper = shallow(<Loader huge />)

    expect(wrapper.hasClass('rev-Loader--huge')).to.equal(true)
  })

  it('assigns a variation on animation-duration when prop "duration" is specified', () => {
    const wrapper = shallow(<Loader duration="600ms" />)

    expect(wrapper.props().style.animationDuration).to.equal('600ms')
  })

  it('assigns a variation on border-top-color when prop "color" is specified', () => {
    const wrapper = shallow(<Loader color="#000000" />)

    expect(wrapper.props().style.borderTopColor).to.equal('#000000')
  })

  it('assigns a variation on border-color when prop "secondaryColor" is specified', () => {
    const wrapper = shallow(<Loader secondaryColor="#FFFFFF" />)

    expect(wrapper.props().style.borderColor).to.equal('#FFFFFF')
  })

  it('throws an error if more than one size-related prop is specified', () => {
    // Construct props wherein more than one size attribute is specified.
    const customProps = {...props, small: true, medium: true}

    expect(() => shallow(<Loader {...customProps} />)).to.throw()
  })
})
