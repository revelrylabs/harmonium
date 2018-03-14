import Sticky, { StatefulSticky } from './Sticky'
import jsdom from 'jsdom'
import sinon from 'sinon'

describe('Sticky', () => {
  it('should render without throwing', () => {
    shallow(<Sticky><span>test</span></Sticky>)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-Sticky'
    const testClassName = '__TEST__'

    const childClassName = shallow(
      <Sticky className={testClassName}>
        <span>test</span>
      </Sticky>
    ).first().prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })
})

const win = {
  scrollBy(x, y) {
    window.scrollBy(x, y);
  }
}

describe('Sticky.Stateful', () => {
  it('should render without throwing', () => {
    shallow(<Sticky.Stateful><span>test</span></Sticky.Stateful>)
  })

  it('sticks the children of a container while scrolling past the container', () => {
    let spy = sinon.spy()
    let component = mount(<Sticky.Stateful><span>test</span></Sticky.Stateful>)
    component.instance().componentDidMount()

    jsdom()

    while(!component.state('isStuck')) {
      win.scrollBy(0, y)
      y++
    }

    console.log(component.state('isStuck'))
    console.log(component.update().state('isStuck'))

    // expect(component.update().state('isStuck')['1']).to.eq(true)
    expect(spy.called).to.eq(true)
  })
})
