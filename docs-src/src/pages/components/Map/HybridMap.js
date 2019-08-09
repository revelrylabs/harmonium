import React, {Component} from 'react'
import ExampleSection from '../../../ExampleSection'
import scope from '../../../ExampleScope'
import Headers from '../../../Headers'
import Layout from '../../../layouts/index.js'

const examples = {
  Basic: require('raw-loader!../../../examples/Map/HybridMap.js.example'),
}

export default class HybridMapExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Headers
          title="Hybrid Map Component"
          metaDescription={
            'This is an Hybrid Map Component, a zoom and style have been given as' +
            'props. An address (a string) has been provided as the center props' +
            'rather than an object with latitude and longitude.'
          }
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
      </Layout>
    )
  }
}
