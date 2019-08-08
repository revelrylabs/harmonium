import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import MediaUploaderProps from './MediaUploaderTables/MediaUploaderProps'
import Layout from '../../layouts/index.js'

const examples = {
  Basic: require('raw-loader!../../examples/MediaUploader/Basic.js.example'),
  'Using Presigned URLs': require('raw-loader!../../examples/MediaUploader/S3.js.example'),
}

export default class MediaUploaderExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Media Uploader"
          metaDescription={
            ('MediaUploader is a FileInput wrapper with a few extra bells and',
            'whistles for image and video files. It validates file size, checks',
            'the file against a configurable list of supported file types, and',
            'shows a preview of the uploaded image or video. Plus, it supports',
            'uploading files via presigned URLs.')
          }
          extraKeywords="Component, Media, Image, Video, Form, Input, Upload"
        >
          <p>
            MediaUploader is a FileInput wrapper with a few extra bells and
            whistles for image and video files. It validates file size, checks
            the file against a configurable list of supported file types, and
            shows a preview of the uploaded image or video. Plus, it supports
            uploading files via presigned URLs.
          </p>

          <p>
            <em>Note:</em> when not making use of the presigned URL upload, the
            enclosing form must have <code>encType="multipart/form-data"</code>
          </p>
        </Headers>
        <ExampleSection
          title="Examples"
          examples={examples}
          depth={1}
          scope={scope}
        />
        <h3>Properties:</h3>
        <MediaUploaderProps />
      </div>
    )
  }
}
