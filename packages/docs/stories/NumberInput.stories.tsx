import type {Meta, StoryObj} from '@storybook/react'
import {NumberInput, Field, FieldLabel} from 'harmonium'

const meta = {
  title: 'Forms/NumberInput',
  component: NumberInput,
  parameters: {
    docs: {
      description: {
        component: `Numeric input with increment/decrement buttons. Field-context-aware.

\`\`\`tsx
import { NumberInput, Field, FieldLabel } from 'harmonium'

<Field>
  <FieldLabel>Quantity</FieldLabel>
  <NumberInput min={0} max={100} step={1} value={qty} onChange={setQty} />
</Field>
\`\`\`

**Sizes:** \`sm\`, \`md\`, \`lg\`
The \`onChange\` callback receives a \`number\` (not an event).`,
      },
    },
  },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Quantity</FieldLabel>
      <NumberInput defaultValue={1} min={0} max={99} />
    </Field>
  ),
}

export const WithStep: Story = {
  render: () => (
    <Field>
      <FieldLabel>Price</FieldLabel>
      <NumberInput defaultValue={10} step={5} min={0} max={100} />
    </Field>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
      <NumberInput size="sm" defaultValue={1} />
      <NumberInput size="md" defaultValue={1} />
      <NumberInput size="lg" defaultValue={1} />
    </div>
  ),
}
