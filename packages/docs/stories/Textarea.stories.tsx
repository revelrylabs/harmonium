import type {Meta, StoryObj} from '@storybook/react'
import {Textarea, Field, FieldLabel, FieldError} from 'harmonium'

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `Multi-line text input. Field-context-aware — wrap in \`Field\` for labels, descriptions, and error states.

\`\`\`tsx
import { Textarea, Field, FieldLabel } from 'harmonium'

<Field>
  <FieldLabel>Bio</FieldLabel>
  <Textarea rows={4} placeholder="Tell us about yourself..." />
</Field>
\`\`\`

Extends all native \`<textarea>\` HTML attributes.`,
      },
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Message</FieldLabel>
      <Textarea placeholder="Type your message..." />
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field error>
      <FieldLabel>Bio</FieldLabel>
      <Textarea />
      <FieldError>Bio is required</FieldError>
    </Field>
  ),
}
