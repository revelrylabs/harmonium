import React, { Component } from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Basic': require('raw!../../examples/StatelessDrawer/Basic.js.example'),
}

export default class StatelessDrawerExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="StatelessDrawer" examples={examples} depth={1} scope={scope} />
    </div>
  }
}

/* The overlay drawer design is fixed, so it overlays on the actual 
drawer.I did not want to modify the design but it does conflict 
with the website outlay.
This as well means this was not possible to have the StatelessDrawer and NewDrawer on the same page. */