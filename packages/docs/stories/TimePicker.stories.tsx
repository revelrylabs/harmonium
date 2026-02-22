import type {Meta, StoryObj} from '@storybook/react'
import {TimePicker, Field, FieldLabel} from 'harmonium'

const meta = {
  title: 'Forms/TimePicker',
  component: TimePicker,
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
