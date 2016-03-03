import React, {Component, PropTypes} from 'react'
import Application from './Application'
import ServerRenderer from './ServerRenderer'

class Wrapper extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        <p>The wrapper was applied.</p>
      </div>
    )
  }
}

class ContextTest extends Component {
  static contextTypes = {
    application: PropTypes.object.isRequired
  }
  render() {
    console.log(this.context.application)
    return null
  }
}

class TestComponent extends Component {
  render() {
    return (
      <div>
        <h1>Hello, my name is {this.props.name}</h1>
        <ContextTest />
      </div>
    )
  }
}

const app = new Application({
  domContainerId: '__TEST__',
  views: {
    widgets: {
      index: TestComponent
    }
  },
  transform: (instance) => <Wrapper>{instance}</Wrapper>
})

const renderer = new ServerRenderer(app)

const viewName = 'widgets/index'
const viewProps = {name: 'Claudius'}

if(renderer.hasView(viewName)) {
  console.log(renderer.renderView(viewName, viewProps))
} else {
  console.log(`Could not find ${viewName}`)
}
