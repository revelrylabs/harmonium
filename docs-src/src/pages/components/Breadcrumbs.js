import React, { Component } from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Breadcrumbs: require('raw-loader!../../examples/Breadcrumbs.js.example'),
}

export default class BreadcrumbsExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="rev-Row rev-Row--collapse">
          <Headers
            title="Breadcrumbs"
            metaDescription={
              'Breadcrumbs are a type of secondary navigation scheme that reveal the user&apos;s location in a website or application'
            }
            extraKeywords="Component, Breadcrumb, Navigation"
          >
            <p>
              Breadcrumbs are a type of secondary navigation scheme that reveal the user&apos;s location in a website or application
            </p>
          </Headers>
          <ExampleSection
            title="Examples"
            examples={examples}
            depth={1}
            scope={scope}
          />
        </div>
      </Layout>
    )
  }
}
