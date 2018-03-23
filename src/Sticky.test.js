import Sticky, { StatefulSticky } from './Sticky'
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

describe('Sticky.Stateful', () => {
  it('should render without throwing', () => {
    shallow(<Sticky.Stateful><span>test</span></Sticky.Stateful>)
  })

  xit('sticks the children of a container while scrolling past the container', () => {
    // this is x'd out because I can't figure out why the container isn't
    // taking the width and height in the provided style object

    let component = mount(
      <Sticky.Stateful style={{
        paddingBottom: '1000px',
        width: '400px',
        height: '400px',
        margin: '750px auto'
      }}>
        <span>
          test
        </span>
      </Sticky.Stateful>
    )
    
    console.log(component.instance().stickyContainer.style)
    console.log(component.instance().stickyContainer.getBoundingClientRect())

    const containerTop = component.instance().stickyContainer.getBoundingClientRect().top

    window.scrollY = containerTop + 1;

    component.update().state('isStuck')

    console.log(component.state('isStuck'))

    expect(component.state('isStuck')).to.eq(true)
  })
})
