import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  'Number Formatter': require('raw!../../examples/NumberFormatter.js.example'),
}

export default class NumberFormatterExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Number Formatter"
          metaDescription={
            'The NumberFormatter component formats a number into a user-friendly ' +
            'and localized format. It can support a wide variety of styles and ' +
            'locales.'
          }
          extraKeywords="Component, NumberFormatter, Localization, Formatting"
        >
          <p>
            The NumberFormatter component formats a number into a user-friendly
            and localized format. It can support a wide variety of styles and
            locales. In fact, it supports all of the number formatting options
            supported by the JavaScript number localization API.
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
