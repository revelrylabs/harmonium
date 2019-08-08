import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Basic: require('raw-loader!../../examples/Drawer/Basic.js.example'),
  Scroll: require('raw-loader!../../examples/Drawer/Scroll.js.example'),
  Overlay: require('raw-loader!../../examples/Drawer/Overlay.js.example'),
}

export default class DrawerExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Drawer"
          metaDescription={
            'A drawer is a container for content that can be collapsed. It should ' +
            'be used for lower priority, non-essential content, or for controls ' +
            'that can safely be hidden if screen space is at a premium.'
          }
          extraKeywords="Component, Drawer, Collapse, Expander, Container"
        >
          <p>
            A drawer is a container for content that can be collapsed. It should
            be used for lower priority, non-essential content, or for controls
            that can safely be hidden if screen space is at a premium.
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
