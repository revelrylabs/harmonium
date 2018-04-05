import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  Basic: require('raw!../../examples/StatelessDrawer/Basic.js.example'),
}

export default class StatelessDrawerExamplePage extends Component {
  render() {
    return (
      <div>
        <ExampleSection
          title="StatelessDrawer"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </div>
    )
  }
}
