import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Standalone: require('raw-loader!../../examples/InputGroup/Standalone.js.example'),
  Stack: require('raw-loader!../../examples/InputGroup/Stack.js.example'),
}

export default class InputGroupExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="InputGroup"
          metaDescription={
            'The InputGroup is a grouping on several related labels, inputs, ' +
            'and buttons together in a compact format.'

          }
          extraKeywords="Component, Input, InputGroup, Forms"
        >
          <p>
            The InputGroup is a grouping on several related labels, inputs,
            and buttons together in a compact format. For example, you can group
            an input, along with a relevant caption or unit of measure, along
            with several buttons to take action on that input.
          </p>
        </Headers>
        <ExampleSection
          title="Examples"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </div>
    )
  }
}
