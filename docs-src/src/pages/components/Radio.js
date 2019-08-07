import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Singular: require('raw-loader!../../examples/Radio/Singular.js.example'),
  Fieldset: require('raw-loader!../../examples/Radio/Fieldset.js.example'),
}

export default class RadioExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Radio Button"
          metaDescription={
            'The Radio component implements a Radio Button control, typically ' +
            'for use in forms. A Radio should be used in cases where a user must ' +
            'select one option between multiple choices.'
          }
          extraKeywords="Component, Radio Button, Input, Forms"
        >
          <p>
            The Radio component implements a Radio Button control, typically for
            use in forms. A Radio should be used in cases where a user must
            select one option between multiple choices. Checkboxes should
            generally not be used as a substitute for buttons-- they should not
            usually have immediate automatic actions associated. For example, if
            you want a control to submit a form upon click, you want a button.
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
