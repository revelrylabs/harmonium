import type {Meta, StoryObj} from '@storybook/react'
import {Combobox, Field, FieldLabel} from 'harmonium'
import {useState} from 'react'

const meta = {
  title: 'Forms/Combobox',
  component: Combobox,
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
