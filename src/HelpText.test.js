import HelpText from './HelpText'

describe('HelpText', () => {
  it('can shallow render', () => {
    expect(() => shallow(<HelpText>test</HelpText>)).not.to.throw()
  })

  it('returns children when present', () => {
    const component = shallow(<HelpText><p>test</p></HelpText>)

    expect(component.find('p')).to.have.length(1)
  })

  it('returns text when present', () => {
    const component = shallow(<HelpText>test</HelpText>)

    expect(component.find('span')).to.have.length(1)
    expect(component.find('span')).to.have.text('test')
  })
})
