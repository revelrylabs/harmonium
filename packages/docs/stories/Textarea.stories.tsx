import type {Meta, StoryObj} from '@storybook/react'
import {Textarea, Field, FieldLabel, FieldError} from 'harmonium'

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
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
