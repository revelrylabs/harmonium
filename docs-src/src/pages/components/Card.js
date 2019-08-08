import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Card: require('raw-loader!../../examples/Card.js.example'),
}

export default class CardExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Cards"
          metaDescription={
            'Cards are a modular container for content. Cards group related ' +
            'content and media together.'
          }
          extraKeywords="Component, Cards, Media, Feed, Gallery"
        >
          <p>
            Cards are a modular container for content. Cards group related
            content &amp; media together. For example, a user's name, bio, and
            profile picture could go in one card together.
          </p>
          <p>
            Typically, when you use a card, you will use multiple together to make
            a gallery or feed.
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
