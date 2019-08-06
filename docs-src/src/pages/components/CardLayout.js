import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  CardLayout: require('raw-loader!../../examples/CardLayout.js.example'),
}

export default class CardLayoutExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Card Layouts"
          metaDescription={
            'CardLayouts are used with Cards to force a particular kind of ' +
            'behavior for a card.'
          }
          extraKeywords="Component, Cards, Media, Feed, Gallery"
        >
          <p>
            CardLayouts are used with Cards to force a particular kind of
            behavior for a card.
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
