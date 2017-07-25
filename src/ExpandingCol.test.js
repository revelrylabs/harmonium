import 'jsdom-global/register'
import {ExpandingCol, ExpandingColStateContainer} from './ExpandingCol'

describe('ExpandingCol', () => {
  it('should render closed with is-closed', () => {
    let classes = shallow(
      <ExpandingCol>Test</ExpandingCol>
    ).first().prop('className')

    expect(classes).to.contain('is-closed')
  })

  it('should render open with is-open', () => {
    let classes = shallow(
      <ExpandingCol open>Test</ExpandingCol>
    ).first().prop('className')

    expect(classes).to.contain('is-open')
  })
})

describe('ExpandingColStateContainer', () => {
  it('should render without throwing', () => {
    shallow(<ExpandingColStateContainer>Test</ExpandingColStateContainer>)
  })

  it('should be openable and closeable', () => {
    let container = mount(
      <ExpandingColStateContainer>Test</ExpandingColStateContainer>
    )
    let expander = container.find('.rev-ExpandingCol-expander')

    expander.simulate('click')

    expect(container.state('open')).to.eq(true)

    expander.simulate('click')

    expect(container.state('open')).to.eq(false)
  })
})
