import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'No Props': require('raw-loader!../../examples/Sticky/Basic.js.example'),
  'Stick to Bottom': require('raw-loader!../../examples/Sticky/Bottom.js.example'),
  'With Anchors': require('raw-loader!../../examples/Sticky/Anchors.js.example'),
  'With Offsets': require('raw-loader!../../examples/Sticky/Offset.js.example'),
  'Nav': require('raw-loader!../../examples/Sticky/Navigation.js.example'),
}

export default class StickyExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Headers
          title="Sticky"
          metaDescription={
            'The Sticky component is a container that "sticks" to an edge of the ' +
            'browser window as it is scrolled. It is typically used for navigation ' +
            'elements or important messages that should remain in sight as the user ' +
            'scrolls.'
          }
          extraKeywords="Component, Sticky, Layout, Navigation"
        >
          <p>
            The Sticky component is a container that "sticks" to an edge of the
            browser window as it is scrolled. It is typically used for
            navigation elements or important messages that should remain in
            sight as the user scrolls. It should be used sparingly only when the
            contents are important, because it takes up space and distracts the
            user.
          </p>
        </Headers>
        <ExampleSection
          title="Sticky"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </Layout>
    )
  }
}
