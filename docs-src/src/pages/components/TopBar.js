import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  'TopBar : Default (Justifed Content)': require('raw!../../examples/TopBar/TopBar.js.example'),
  'TopBar : Centered Content': require('raw!../../examples/TopBar/TopBarCenter.js.example'),
  'TopBar : Left-aligned Content': require('raw!../../examples/TopBar/TopBarLeft.js.example'),
  'TopBar : Right-aligned Content': require('raw!../../examples/TopBar/TopBarRight.js.example'),
}

export default class TopBarExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="TopBar"
          metaDescription={
            'The TopBar component is a navigation element intended to be placed ' +
            'at the top of the page. The TopBar component supports many different ' +
            'layout options.'
          }
          extraKeywords="Component, TopBar, Navigation, Menu"
        >
          <p>
            The TopBar component is a navigation element intended to be placed
            at the top of the page. The TopBar component supports many different
            layout options. The TopBar component also supports the inclusion of
            any arbitrary child components.
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
