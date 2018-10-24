import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  'Basic': require('raw!../../examples/MediaUploader.js.example'),
}

export default class MediaUploaderExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Media Uploader"
          metaDescription={
            'will go here'
          }
          extraKeywords="Component, Media, Image, Video, Form, Input, Upload"
        >
          <p>
            There will be a description here
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
