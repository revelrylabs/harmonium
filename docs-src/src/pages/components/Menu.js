import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Menu : Default': require('raw!../../examples/Menu/Default.js.example'),
  'Menu : Horizontal': require('raw!../../examples/Menu/Horizontal.js.example'),
  'Menu : Vertical': require('raw!../../examples/Menu/Vertical.js.example'),
  'Menu : Nested': require('raw!../../examples/Menu/Nested.js.example'),
}

export default class MenuExamplePage extends Component {
  render() {
    return (
      <div>
        <ExampleSection
          title="Menus"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </div>
    )
  }
}
