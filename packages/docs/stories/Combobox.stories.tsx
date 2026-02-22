import type {Meta, StoryObj} from '@storybook/react'
import {Combobox, Field, FieldLabel} from 'harmonium'
import {useState} from 'react'

const meta = {
  title: 'Forms/Combobox',
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component: `Searchable single-select dropdown. Filters options as the user types.

\`\`\`tsx
import { Combobox } from 'harmonium'

const options = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
]

<Combobox options={options} value={value} onChange={setValue} placeholder="Select country" />
\`\`\`

Provide \`options\` as an array of \`{ value: string, label: string }\`.
For multi-selection, use \`MultiSelect\` instead.`,
      },
    },
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const frameworks = [
  {value: 'react', label: 'React'},
  {value: 'vue', label: 'Vue'},
  {value: 'angular', label: 'Angular'},
  {value: 'svelte', label: 'Svelte'},
  {value: 'solid', label: 'SolidJS'},
  {value: 'qwik', label: 'Qwik'},
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Field>
        <FieldLabel>Framework</FieldLabel>
        <Combobox options={frameworks} value={value} onChange={setValue} placeholder="Search frameworks..." />
      </Field>
    )
  },
}
