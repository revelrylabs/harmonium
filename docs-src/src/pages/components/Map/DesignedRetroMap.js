import React, {Component} from 'react'
import ExampleSection from '../../../ExampleSection'
import scope from '../../../ExampleScope'
import Headers from '../../../Headers'

const examples = {
  Basic: require('raw!../../../examples/Map/DesignedRetroMap.js.example'),
}

export default class DesignedRetroMapExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Designed Retro Map Component"
          metaDescription={'This is a Map Component'}
          extraKeywords="Map"
        >
          <p>
            This is a Designed Retro Map Component, we have passed the
            RetroStyle as a styles props to Map. A zoom, object center (latitude
            and longitude) and style have been provided as props. Icons can be
            clicked and Info windows easily dismissed.
          </p>
        </Headers>
        <ExampleSection examples={examples} depth={1} scope={scope} />
      </div>
    )
  }
}
