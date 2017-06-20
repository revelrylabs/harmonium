import Social from './Social'

describe('Social', () => {
  it('should render without throwing', () => {
    shallow(<Social type={Social.types.FACEBOOK} url="https://revelry.co" />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'social'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Social className={testClassName} type={Social.types.FACEBOOK} url="https://revelry.co" />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('should render the right link', () => {
      const tweetLink = "https://twitter.com/intent/tweet?url=http%3A%2F%2Frevelry.co&text=Check%20this%20out!"
      
      const renderedLink = shallow(<Social type={Social.types.TWITTER} url="http://revelry.co" />).first().prop('href')

      expect(renderedLink).to.equal(tweetLink)
  })
})
