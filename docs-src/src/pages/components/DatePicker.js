import React from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import DatePickerDemo from '../../examples/DatePicker/DatePickerDemo'

const examples = {
  'Date Picker': require('raw-loader!../../examples/DatePicker/DatePickerDemo.tsx'),
  'TypeScript Example': require('raw-loader!../../examples/DatePicker/TypeScriptExample.tsx.example'),
  'Advanced TypeScript Example': require('raw-loader!../../examples/DatePicker/AdvancedTypeScriptExample.tsx.example'),
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
        <p>
          <strong>TypeScript Support:</strong> This component is fully typed and can be used in TypeScript projects
          with proper type checking for props like <code>isSelectable</code>, <code>highlights</code>, and event handlers.
        </p>
        <h4>TypeScript Tips</h4>
        <ul>
          <li>
            <strong>Event Handling:</strong> When using the <code>onChange</code> handler, cast the event target: {' '}
            <code>const target = event.target as HTMLInputElement</code>
          </li>
          <li>
            <strong>isSelectable prop:</strong> Takes a function with type signature <code>(date: DateTime) =&gt; boolean</code>
          </li>
          <li>
            <strong>highlights prop:</strong> Can be a string array, an object map, or a function:
            <ul>
              <li><code>string[]</code> - Array of ISO date strings</li>
              <li><code>Record&lt;string, string&gt;</code> - Map of dates to class names</li>
              <li><code>(date: DateTime) =&gt; boolean | string</code> - Function returning a boolean or class name</li>
            </ul>
          </li>
        </ul>
        <DatePickerDemo />
      </ExampleSection>
    </div>
  )
}
