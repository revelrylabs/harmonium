import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Basic': require('raw!../../examples/Pagination/Basic.js.example'),
  'With Customization': require('raw!../../examples/Pagination/WithCustomization.js.example'),
  'Custom Button Content': require('raw!../../examples/Pagination/WithCustomContent.js.example'),
}

export default class PaginationExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
