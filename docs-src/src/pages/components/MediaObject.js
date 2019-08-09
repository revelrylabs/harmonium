import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'Basic': require('raw-loader!../../examples/MediaObject/Basic.js.example'),
  'Stack': require('raw-loader!../../examples/MediaObject/Stack.js.example'),
  'SectionAlignment': require('raw-loader!../../examples/MediaObject/SectionAlignment.js.example'),
  'Nested': require('raw-loader!../../examples/MediaObject/Nested.js.example'),
}

export default class MediaObjectExamplePage extends Component {
  render() {
    return <Layout location={this.props.location}>
      <Headers
        title="Media Object"
        metaDescription={
          'The MediaObject component contains one or more images, videos, or ' +
          'blocks of text and places them into a layout and/or aspect ratio.'
        }
        extraKeywords="Component, Media, Image, Video, Aspect Ratio"
      >
        <p>
          The MediaObject component contains one or more images, videos, or
          blocks of text and places them into a layout and/or aspect ratio. For
          example, the elements of the MediaObject can be stacked at certain
          breakpoints, or all top aligned. An image can be made to stretch.
        </p>
      </Headers>
      <ExampleSection
        title="Examples"
        examples={examples}
        depth={1}
        scope={scope}
      />
    </Layout>
  }
}
