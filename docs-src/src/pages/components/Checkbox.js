import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Basic: require('raw-loader!../../examples/Checkboxes/Basic.js.example'),
  'Fieldset With Help and Error Text': require('raw-loader!../../examples/Checkboxes/FieldsetWithHelpAndError.js.example'),
}

export default class CheckboxExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="rev-Row rev-Row--collapse">
          <Headers
            title="Checkbox"
            metaDescription={
              'Harmonium provides checkboxes and checkbox groups for use in forms.'
            }
            extraKeywords="Component, Checkbox, Form"
          >
            <p>
              Harmonium provides checkboxes and checkbox groups for use in forms. Use
              a checkbox when the user needs to make one or more 'yes or no'
              selections. Checkboxes should generally not be used as a substitute
              for buttons-- they should not usually have immediate automatic
              actions associated. For example, if you want a control to submit a
              form upon click, you want a button.
            </p>
          </Headers>
          <ExampleSection
            title="Checkboxes"
            examples={examples}
            depth={1}
            scope={scope}
          />
        </div>
      </Layout>
    )
  }
}
