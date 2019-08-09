import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Links: require('raw-loader!../../examples/Social/Link.js.example'),
  'With Icons And Buttons': require('raw-loader!../../examples/Social/IconsAndButtons.js.example'),
}

export default class SocialExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Headers
          title="Social Links"
          metaDescription={
            'The Social component can create "share links" for a wide variety of ' +
            'social networks. It works through specially formatted urls available ' +
            'for each network, so it does not require heavy third party embeds.'
          }
          extraKeywords="Component, Social, Social Links, Share, Share Links"
        >
          <p>
            The Social component can create "share links" for a wide variety of
            social networks. It works through specially formatted urls available
            for each network, so it does not require heavy third party embeds.
          </p>
        </Headers>
        <ExampleSection
          title="Examples"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </Layout>
    )
  }
}
