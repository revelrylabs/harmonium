import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import Badge from 'harmonium/lib/Badge'
import Headers from '../../Headers'

const examples = {
  Badges: require('raw-loader!../../examples/Badge.js.example'),
}

const scope = {React, Badge}

export default class BadgeExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Badges"
          metaDescription={
            'Badges are small UI accents that provide status or numerical ' +
            'feedback, for example, unread message counts.'
          }
          extraKeywords="Component, Badge, Badges, Unread, Status"
        >
          <p>
            Badges are small UI accents that provide status or numerical
            feedback, for example, unread message counts.
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
