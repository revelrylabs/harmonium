import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'Basic': require('raw-loader!../../examples/Pagination/Basic.js.example'),
  'With Customization': require('raw-loader!../../examples/Pagination/WithCustomization.js.example'),
  'Custom Button Content': require('raw-loader!../../examples/Pagination/WithCustomContent.js.example'),
}

export default class PaginationExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Pagination"
          metaDescription={
            'The Pagination component provides an interface for navigating data ' +
            'or result sets that are spread across multiple pages.'
          }
          extraKeywords="Component, Pagination"
        >
          <p>
            The Pagination component provides an interface for navigating data
            or result sets that are spread across multiple pages. It can support
            arbitrary actions upon page button click. This means it isn't tied
            to any particular URL structure or API approach.
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
