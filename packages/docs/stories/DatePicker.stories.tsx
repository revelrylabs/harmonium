import type {Meta, StoryObj} from '@storybook/react'
import {DatePicker, Field, FieldLabel} from 'harmonium'

const meta = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: `Date input. Renders as \`<input type="date">\`. Field-context-aware.

\`\`\`tsx
import { DatePicker, Field, FieldLabel } from 'harmonium'

<Field>
  <FieldLabel>Start Date</FieldLabel>
  <DatePicker value={date} onChange={handleChange} />
</Field>
\`\`\`

**Sizes:** \`sm\`, \`md\`, \`lg\`
Use \`min\` and \`max\` to constrain the date range.`,
      },
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Start date</FieldLabel>
      <DatePicker />
    </Field>
  ),
}

export const WithRange: Story = {
  render: () => (
    <Field>
      <FieldLabel>Booking date</FieldLabel>
      <DatePicker min="2024-01-01" max="2024-12-31" />
    </Field>
  ),
}
