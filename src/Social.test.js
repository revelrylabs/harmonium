import Social from './Social'

describe('Social', () => {
  it('should render without throwing', () => {
    shallow(<Social />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'social'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Social className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('should render the right link', () => {
      const tweetLink = "https://twitter.com/intent/tweet?url=http://revelry.co&text=Check%20this%20out!"
      
      const renderedLink = shallow(<Social socialNetwork="Twitter" />).first().prop('href')

      expect(renderedLink).to.equal(tweetLink)
  })
})
