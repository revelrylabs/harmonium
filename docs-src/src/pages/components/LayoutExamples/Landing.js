import React, {Component} from 'react'
import ExampleSection from '../../../ExampleSection'
import scope from '../../../ExampleScope'
import Headers from '../../../Headers'
import Layout from '../../../layouts/index.js'

const examples = {
  Basic: require('raw-loader!../../../examples/LayoutExamples/LandingHero.js.example'),
  FeaturedDefault: require('raw-loader!../../../examples/LayoutExamples/LandingFeaturedDefault.js.example'),
  FeaturedCard: require('raw-loader!../../../examples/LayoutExamples/LandingFeaturedCard.js.example'),
}

export default class LandingExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location} meta="This is an example of how Harmonium components can be used to create a Landing Page">
        <ExampleSection examples={examples} depth={1} scope={scope} />
      </Layout>
    )
  }
}
