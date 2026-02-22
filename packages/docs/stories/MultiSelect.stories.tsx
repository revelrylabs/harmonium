import type {Meta, StoryObj} from '@storybook/react'
import {MultiSelect, Field, FieldLabel} from 'harmonium'
import {useState} from 'react'

const meta = {
  title: 'Forms/MultiSelect',
  component: MultiSelect,
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

const skills = [
  {value: 'react', label: 'React'},
  {value: 'typescript', label: 'TypeScript'},
  {value: 'node', label: 'Node.js'},
  {value: 'python', label: 'Python'},
  {value: 'rust', label: 'Rust'},
  {value: 'go', label: 'Go'},
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <Field>
        <FieldLabel>Skills</FieldLabel>
        <MultiSelect options={skills} value={value} onChange={setValue} placeholder="Add skills..." />
      </Field>
    )
  },
}

export const WithDefaults: Story = {
  render: () => {
    const [value, setValue] = useState(['react', 'typescript'])
    return (
      <Field>
        <FieldLabel>Skills</FieldLabel>
        <MultiSelect options={skills} value={value} onChange={setValue} />
      </Field>
    )
  },
}
