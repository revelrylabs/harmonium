import AuthenticityToken from './AuthenticityToken'
import AuthenticityTokenProvider from './AuthenticityTokenProvider'
import sinon from 'sinon'

describe('AuthenticityToken', () => {
  it('can render with token provide context', () => {
    const provider = mount(
      <AuthenticityTokenProvider name="csrf" value="plz no hackerz">
        <AuthenticityToken />
      </AuthenticityTokenProvider>
    )
    const token = provider.find('input')

    expect(token.prop('value')).to.eq('plz no hackerz')
  })

  it('can render without a token provider with no error', () => {
    const token = mount(<AuthenticityToken />)
  })
})
