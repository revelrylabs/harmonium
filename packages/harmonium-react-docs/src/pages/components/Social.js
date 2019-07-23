import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Links: require('raw!../../examples/Social/Link.js.example'),
  'With Icons And Buttons': require('raw!../../examples/Social/IconsAndButtons.js.example'),
}

export default class SocialExamplePage extends Component {
  render() {
    return (
      <div>
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
      </div>
    )
  }
}
