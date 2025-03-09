import React from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import DatePickerDemo from '../../examples/DatePicker/DatePickerDemo'

const examples = {
  'Date Picker': require('raw-loader!../../examples/DatePicker/DatePickerDemo.tsx'),
}

export default function DatePickerPage() {
  return (
    <div className="rev-Row rev-Row--collapse">
      <Headers
        title="Date Picker"
        metaDescription={'A DatePicker component that contains a Calendar with selection abilities.'}
        sourceLink="https://github.com/revelrylabs/harmonium/tree/main/src/DatePicker"
      />
      <ExampleSection
        title="Date Picker"
        examples={examples}
        scope={scope}
      >
        <p>
          The DatePicker is a component that contains a Calendar with selection abilities.
          It supports various configurations and is now fully TypeScript compatible.
        </p>
        <DatePickerDemo />
      </ExampleSection>
    </div>
  )
}
