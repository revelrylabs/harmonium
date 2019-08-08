import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'Option As Children And Options As Props': require('raw-loader!../../examples/Select/OptionChildrenVsOptionsProp.js.example'),
  'Multiple Select With Values': require('raw-loader!../../examples/Select/MultipleValues.js.example'),
  'Select Stacks': require('raw-loader!../../examples/Select/Stacks.js.example'),
}

export default class SelectExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Select"
          metaDescription={
            'The Select component is for making drop down option selections. It ' +
            'should be used when a user is choosing between many options (more ' +
            'than would be practical with a radio button or checkbox set).'
          }
          extraKeywords="Component, Select, Dropdown, Input, Forms"
        >
          <p>
            The Select component is for making drop down option selections. It
            should be used when a user is choosing between many options (more
            than would be practical with a radio button or checkbox set).
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
