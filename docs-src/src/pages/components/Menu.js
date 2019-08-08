import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'Menu : Default': require('raw-loader!../../examples/Menu/Default.js.example'),
  'Menu : Horizontal': require('raw-loader!../../examples/Menu/Horizontal.js.example'),
  'Menu : Vertical': require('raw-loader!../../examples/Menu/Vertical.js.example'),
  'Menu : Nested': require('raw-loader!../../examples/Menu/Nested.js.example'),
}

export default class MenuExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Menu"
          metaDescription={
            'The Menu component is a very flexible component for making menus ' +
            'and navigation elements that will fit in a wide variety of ' +
            'situations.'
          }
          extraKeywords="Component, Menu, Navigation, Layout"
        >
          <p>
            The Menu component is a very flexible component for making menus and
            navigation elements that will fit in a wide variety of situations.
            For example, it can be used for a sidebar navigation, or a top of
            page navigation element (topbar). A wide variety to stacking and
            alignment options are available.
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
