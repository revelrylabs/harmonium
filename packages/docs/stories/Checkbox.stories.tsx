import type {Meta, StoryObj} from '@storybook/react'
import {Checkbox, Stack} from 'harmonium'

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {label: 'Accept terms and conditions'},
}

export const Group: Story = {
  render: () => (
    <Stack gap="sm">
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="SMS notifications" />
      <Checkbox label="Push notifications" />
    </Stack>
  ),
}

export const Disabled: Story = {
  args: {label: 'Disabled option', disabled: true},
}
