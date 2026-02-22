import type {Meta, StoryObj} from '@storybook/react'
import {Select, Field, FieldLabel} from 'harmonium'

const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: `Native select dropdown with size variants. Field-context-aware — wrap in \`Field\` for labels and error states. Use \`<option>\` elements as children.

\`\`\`tsx
import { Select, Field, FieldLabel } from 'harmonium'

<Field>
  <FieldLabel>Country</FieldLabel>
  <Select placeholder="Choose...">
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </Select>
</Field>
\`\`\`

**Sizes:** \`sm\`, \`md\`, \`lg\`
For searchable dropdowns, use \`Combobox\` instead.`,
      },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Country</FieldLabel>
      <Select placeholder="Select a country">
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </Select>
    </Field>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
      <Select size="sm"><option>Small</option></Select>
      <Select size="md"><option>Medium</option></Select>
      <Select size="lg"><option>Large</option></Select>
    </div>
  ),
}
