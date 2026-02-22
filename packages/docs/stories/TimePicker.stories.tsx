import type {Meta, StoryObj} from '@storybook/react'
import {TimePicker, Field, FieldLabel} from 'harmonium'

const meta = {
  title: 'Forms/TimePicker',
  component: TimePicker,
  parameters: {
    docs: {
      description: {
        component: `Time input. Renders as \`<input type="time">\`. Field-context-aware.

\`\`\`tsx
import { TimePicker, Field, FieldLabel } from 'harmonium'

<Field>
  <FieldLabel>Meeting Time</FieldLabel>
  <TimePicker value={time} onChange={handleChange} />
</Field>
\`\`\`

**Sizes:** \`sm\`, \`md\`, \`lg\``,
      },
    },
  },
} satisfies Meta<typeof TimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Meeting time</FieldLabel>
      <TimePicker />
    </Field>
  ),
}
