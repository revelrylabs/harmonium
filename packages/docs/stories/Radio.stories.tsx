import type {Meta, StoryObj} from '@storybook/react'
import {Radio, RadioGroup} from 'harmonium'

const meta = {
  title: 'Forms/Radio',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: `Radio buttons grouped inside a \`RadioGroup\` fieldset with a legend.

\`\`\`tsx
import { Radio, RadioGroup } from 'harmonium'

<RadioGroup legend="Plan" name="plan">
  <Radio label="Free" value="free" />
  <Radio label="Pro" value="pro" />
  <Radio label="Enterprise" value="enterprise" />
</RadioGroup>
\`\`\`

\`RadioGroup\` renders a \`<fieldset>\` with a \`<legend>\`. Each \`Radio\` accepts a \`label\` prop.`,
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup legend="Preferred contact method">
      <Radio name="contact" value="email" label="Email" defaultChecked />
      <Radio name="contact" value="phone" label="Phone" />
      <Radio name="contact" value="mail" label="Mail" />
    </RadioGroup>
  ),
}
