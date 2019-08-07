import React, {Component} from 'react'
import ExampleSection from '../../../ExampleSection'
import scope from '../../../ExampleScope'
import Headers from '../../../Headers'

const examples = {
  Basic: require('raw-loader!../../../examples/Map/DefaultMap.js.example'),
}

export default class DefaultMapExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Default Map Component"
          metaDescription={
            'This is a Default Map Component, no zoom or styles have been given' +
            'as props. An address (a string) has been provided as the center' +
            'props rather than an object with latitude and longitude.'
          }
          extraKeywords="Map"
        >
          <p>
            This is a Default Map Component, no zoom or styles have been given
            as props. An address (a string) has been provided as the center
            props rather than an object with latitude and longitude. You can
            click on the icons, clicking on the background map will dismiss the
            Info windows. Icons are customizable.
          </p>
        </Headers>
        <ExampleSection examples={examples} depth={1} scope={scope} />
      </div>
    )
  }
}
