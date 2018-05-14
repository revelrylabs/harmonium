import React, {Component} from 'react'
import ExampleSection from '../../../ExampleSection'
import scope from '../../../ExampleScope'
import Headers from '../../../Headers'

const examples = {
  Basic: require('raw!../../../examples/Map/HybridMap.js.example'),
}

export default class HybridMapExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Hybrid Map Component"
          metaDescription={'This is a Map Component'}
          extraKeywords="Map"
        >
          <p>
            This is an Hybrid Map Component, a zoom and style have been given as
            props. An address (a string) has been provided as the center props
            rather than an object with latitude and longitude. You can click on
            the icons, clicking on the background map will dismiss the Info
            windows. Icons are customizable.
          </p>
        </Headers>
        <ExampleSection examples={examples} depth={1} scope={scope} />
      </div>
    )
  }
}
