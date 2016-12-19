import Radio from './Radio'

describe('Radio', () => {
  it('should render without throwing', () => {
    shallow(<Radio />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Radio className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})

describe('Radio.Fieldset', () => {
  const options = [
    {label: 'Left', value: 'L'},
    {label: 'Right', value: 'R'},
  ]

  it('should render without throwing', () => {
    shallow(<Radio.Fieldset options={options} />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(
      <Radio.Fieldset className={testClassName} options={options} />
    )
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})
