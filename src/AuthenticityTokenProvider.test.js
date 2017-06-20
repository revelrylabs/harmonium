import AuthenticityTokenProvider from './AuthenticityTokenProvider'
import Form from './Form'

describe('AuthenticityTokenProvider', () => {
  it('should render without throwing', () => {
    shallow(
        <AuthenticityTokenProvider name="token" value="no hackers plz">
            <Form></Form>
        </AuthenticityTokenProvider>
    )
  })
})
