import React, {Component} from 'react'
import ExampleSection from '../../../ExampleSection'
import scope from '../../../ExampleScope'
import Headers from '../../../Headers'

const examples = {
  Basic: require('raw!../../../examples/Map/Basic.js.example'),
}

export default class MapExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Map Component"
          metaDescription={'This is a Map Component'}
          extraKeywords="Map"
        >
          <p>This is a Map Component</p>
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
