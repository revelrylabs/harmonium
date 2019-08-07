import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import ButtonVars from './ButtonTables/ButtonVars'
import ButtonProps from './ButtonTables/ButtonProps'
import ButtonGroupProps from './ButtonTables/ButtonGroupProps'
import Headers from '../../Headers'
import Table from 'harmonium/lib/Table'

const examples = {
  "Sizes": require('raw-loader!../../examples/Button/Sizes.js.example'),
  "Types": require('raw-loader!../../examples/Button/Types.js.example'),
  "Expanded": require('raw-loader!../../examples/Button/Expanded.js.example'),
  'Button with Form Attributes': require('raw-loader!../../examples/Button/FormAttributes.js.example'),
  'Buttons with href prop become anchor links': require('raw-loader!../../examples/Button/LinkButton.js.example'),
  'Button Group': require('raw-loader!../../examples/ButtonGroup.js.example'),
}

export default class ButtonExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Buttons"
          metaDescription={
            'Harmonium provides semantic button components for a variety of uses, ' +
            'in differing styles and sizes.'
          }
          extraKeywords="Component, Buttons, Forms"
        >
          <p>
            Harmonium provides semantic button components for a variety of uses,
            in differing styles and sizes.
          </p>
        </Headers>
        <ExampleSection
          examples={examples}
          depth={1}
          scope={scope}
        />
        <h3>Variables:</h3>
        <ButtonVars />
        <h3>Properties:</h3>
        <ButtonProps />
        <h3>ButtonGroup Properties:</h3>
        <ButtonGroupProps />
      </div>
    )
  }
}
