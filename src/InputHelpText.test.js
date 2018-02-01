import InputHelpText from './InputHelpText'

describe('InputHelpText', () => {
  it('can render with a child without error', () => {
    shallow(
      <InputHelpText>Help!</InputHelpText>
    )
  })

  it('can render without a child without error', () => {
    shallow(
      <InputHelpText />
    )
  })
})