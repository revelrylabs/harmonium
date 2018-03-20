import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import Badge from 'awesome-possum/lib/Badge'

const examples = {
  'Badges': require('raw!../../examples/Badge.js.example')
}

const scope = {React: React, Badge: Badge, }

export default class BadgeExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapse">
      <ExampleSection title="Badges" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
