import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  'Stateless': require('raw!../../examples/Sticky/Stateless.js.example'),
  'Stateful': require('raw!../../examples/Sticky/Stateful.js.example'),
  'With Offset': require('raw!../../examples/Sticky/Offset.js.example'),
  'Stick to Bottom': require('raw!../../examples/Sticky/Bottom.js.example'),
  'Stick to Bottom with Offset': require('raw!../../examples/Sticky/BottomOffset.js.example'),
}

export default class StickyExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Sticky"
          metaDescription={
            'The Sticky component is a container that "sticks" to an edge of the ' +
            'browser window as it is scrolled. It is typically used for navigation ' +
            'elements or important messages that should remain in sight as the user ' +
            'scrolls. It should be used sparingly only when the contents are ' +
            'important, because it takes up space and distracts the user.'
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
      </div>
    )
  }
}
