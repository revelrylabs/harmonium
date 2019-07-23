import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Basic: require('raw!../../examples/Icon/Basic.js.example'),
  Foundation: require('raw!../../examples/Icon/Foundation.js.example'),
}

export default class IconExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Icon"
          metaDescription={
            'The Icon component is for embedding icons into pages. It supports ' +
            'a variety of common icon sets.'
          }
          extraKeywords="Component, Icon"
        >
          <p>
            The Icon component is for embedding icons into pages. It supports
            a variety of common icon sets. The Icon component works in any inline
            context, including within paragraphs, links, and buttons.
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
