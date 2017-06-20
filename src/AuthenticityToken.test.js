import AuthenticityToken from './AuthenticityToken'

describe('AuthenticityToken', () => {
  it('should render without throwing', () => {
    shallow(<AuthenticityToken />)
  })

  it('should have a name and value', () => {
    const authenticityTokenName = "token"
    const authenticityTokenValue = "no hackers plz"

    const authenticityToken = shallow(<input name={authenticityTokenName} value={authenticityTokenValue} />)
    const renderedName = authenticityToken.first().prop('name')
    const renderedValue = authenticityToken.first().prop('value')
    
    expect(renderedName).to.equal(authenticityTokenName)
    expect(renderedValue).to.equal(authenticityTokenValue)
  })

})
