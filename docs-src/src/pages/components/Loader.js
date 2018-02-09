import React, { Component } from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  Sizes: require('raw!../../examples/Loader/Sizes.js.example'),
  Types: require('raw!../../examples/Loader/Types.js.example')
  // 'Expanded': require('raw!../../examples/Button/Expanded.js.example'),
  // 'Button with Form Attributes': require('raw!../../examples/Button/FormAttributes.js.example'),
  // 'Buttons with href prop become anchor links': require('raw!../../examples/Button/LinkButton.js.example'),
  // 'Button Group': require('raw!../../examples/ButtonGroup.js.example'),
}

export default class LoaderExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <ExampleSection title="Loader" examples={examples} depth={1} scope={scope} />
      </div>
    )
  }
}
