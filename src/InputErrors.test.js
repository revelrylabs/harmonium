import InputErrors from './InputErrors'

describe('InputErrors', () => {
  it('can shallow render', () => {
    expect(() => shallow(<InputErrors errors={[]} />)).not.to.throw()
  })

  it('does not return a span when errors empty', () => {
    const component = mount(<InputErrors errors={[]} />)

    expect(component.find('span')).to.have.length(0)
  })

  it('returns a span when errors present', () => {
    const component = mount(<InputErrors errors={['test']} />)

    expect(component.find('span')).to.have.length(1)
  })
})
