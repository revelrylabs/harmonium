import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import TopBarProps from './TopBarTables/TopBarProps'
import {Row, Col} from 'harmonium-react/lib/grid'



const examples = {
  'TopBar : Default (Justifed Content)': require('raw-loader!../../examples/TopBar/TopBar.js.example'),
  'TopBar : Centered Content': require('raw-loader!../../examples/TopBar/TopBarCenter.js.example'),
  'TopBar : Left-aligned Content': require('raw-loader!../../examples/TopBar/TopBarLeft.js.example'),
  'TopBar : Right-aligned Content': require('raw-loader!../../examples/TopBar/TopBarRight.js.example'),
  'TopBar : Item-scroll Content': require('raw-loader!../../examples/TopBar/TopBarItemScroll.js.example'),
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
        <Row>
          <Col>
            <h3>Properties:</h3>
          </Col>
          <Col>
            <TopBarProps />
          </Col>
        </Row>
      </div>
    )
  }
}
