import type {Meta, StoryObj} from '@storybook/react'
import {Input, Field, FieldLabel, FieldDescription, FieldError} from 'harmonium'

const meta = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `Text input field. Wrap in a \`Field\` with \`FieldLabel\`, \`FieldDescription\`, and \`FieldError\` for full form field UX with auto-wired accessibility.

\`\`\`tsx
import { Input, Field, FieldLabel, FieldError } from 'harmonium'

<Field error={!!errors.email}>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="you@example.com" />
  <FieldError>{errors.email}</FieldError>
</Field>
\`\`\`

**Sizes:** \`sm\`, \`md\`, \`lg\`
Field-context-aware: auto-wires \`id\`, \`aria-describedby\`, \`aria-errormessage\`, and \`aria-invalid\`.`,
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Field>
      <FieldLabel>Password</FieldLabel>
      <FieldDescription>Must be at least 8 characters</FieldDescription>
      <Input type="password" />
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field error>
      <FieldLabel>Username</FieldLabel>
      <Input value="ab" />
      <FieldError>Username must be at least 3 characters</FieldError>
    </Field>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => <Input placeholder="Disabled input" disabled />,
}
