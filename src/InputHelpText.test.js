import InputHelpText from './InputHelpText'

describe('InputHelpText', () => {
  it('can shallow render', () => {
    expect(() => shallow(<InputHelpText />)).not.to.throw()
  })

  it('does not return a span when text empty', () => {
    const component = mount(<InputHelpText />)

    expect(component.find('span')).to.have.length(0)
  })

  it('returns a span when text present', () => {
    const component = mount(<InputHelpText>test</InputHelpText>)

    expect(component.find('span')).to.have.length(1)
  })
})
