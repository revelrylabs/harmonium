import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Stateless: require('raw-loader!../../examples/Tabs/Stateless.js.example'),
  Stateful: require('raw-loader!../../examples/Tabs/Stateful.js.example'),
}

export default class TabsExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Tabs"
          metaDescription={
            'The Tabs component is a container for multiple sets of content, ' +
            'that displays one content item at a time, based on the currently ' +
            'selected tab.'
          }
          extraKeywords="Component, Tabs"
        >
          <p>
            The Tabs component is a container for multiple sets of content, that
            displays one content item at a time, based on the currently selected
            tab.
          </p>
          <p>
            If you want multiple items to be visible at once, you want an
            Accordion. If you want one item to be visible or not, you want
            either a single item Accordion, a Drawer, or and ExpandingCol,
            depending on the desired appearance.
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
