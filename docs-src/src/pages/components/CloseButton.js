import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  CloseButton: require('raw-loader!../../examples/CloseButton.js.example'),
}

export default class CloseButtonExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Close Button"
          metaDescription={
            'A close button is a special button type that semantic indicates a ' +
            '"close dialog" action.'
          }
          extraKeywords="Component, Buttons, Close Button, Dialog, Modal"
        >
          <p>
            A close button is a special button type that semantic indicates a
            "close dialog" action. Typically, it will be used inside of a card,
            modal, or callout.
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
