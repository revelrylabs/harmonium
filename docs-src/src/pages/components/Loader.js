import React, { Component } from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  Sizes: require('raw!../../examples/Loader/Sizes.js.example'),
  Duration: require('raw!../../examples/Loader/Duration.js.example'),
  Color: require('raw!../../examples/Loader/Color.js.example'),
  'Secondary color': require('raw!../../examples/Loader/SecondaryColor.js.example')
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
