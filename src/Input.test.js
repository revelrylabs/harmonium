import Input from './Input'

describe('Input', () => {
  it('can shallow render', () => {
    expect(() => shallow(
      <Input
        label='How many cars do you have?'
        name='numberCars'
        required
        type='text'
      />
    )).not.to.throw()
  })

  it('shows error message and sets classes when errors present', () => {
    const component = mount(
      <Input
        errors={['Must be present']}
        label='How many cars do you have?'
        name='numberCars'
        required
        type='text'
      />
    )

    expect(component.find('span.form-error.is-visible')).to.have.length(1)
    expect(component.find('input.is-invalid-input')).to.have.length(1)
    expect(component.find('label.is-invalid-label')).to.have.length(1)
  })

  it('adds an asterick for required fields', () => {
    const component = mount(
      <Input
        label='How many cars?'
        name='numberCars'
        required
        type='text'
      />
    )

    expect(component.find('label')).to.have.text('How many cars? *')
  })
})
