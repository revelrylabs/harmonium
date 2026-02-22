import type {Meta, StoryObj} from '@storybook/react'
import {DatePicker, Field, FieldLabel} from 'harmonium'

const meta = {
  title: 'Forms/DatePicker',
  component: DatePicker,
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
