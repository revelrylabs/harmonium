import React, {Component} from 'react'
import ExampleSection from '../../../ExampleSection'
import scope from '../../../ExampleScope'
import Headers from '../../../Headers'

const examples = {
  Basic: require('raw!../../../examples/Map/DesignedSilverMap.js.example'),
}

export default class DesignedSilverMapExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Small Designed Silver Map Component"
          metaDescription={'This is a Map Component'}
          extraKeywords="Map"
        >
          <p>
            This is a Small Designed Silver Map Component, we have passed
            "small" as a prop to the Map component. There is a small, medium and
            large props. As well the silver style comes from SilverStyle props.
            Icons can be clicked and Info windows easily dismissed.
          </p>
        </Headers>
        <ExampleSection examples={examples} depth={1} scope={scope} />
      </div>
    )
  }
}
