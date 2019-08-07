import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  FlexVideo: require('raw-loader!../../examples/FlexVideo.js.example'),
}

export default class FlexVideoExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Flex Video"
          metaDescription={
            'A FlexVideo component is a container that holds a video and can handle ' +
            'a variety of aspect ratios in a flexible layout.'
          }
          extraKeywords="Component, Media, Video, Aspect Ratio, Cover, Contain"
        >
          <p>
            A FlexVideo component is a container that holds a video and can
            handle a variety of aspect ratios in a flexible layout. Use it in
            cases where you need to normalize the presentation of videos with
            different aspect ratios, or handle videos within a flexible aspect
            ratio layout.
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
