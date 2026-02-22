import type {Meta, StoryObj} from '@storybook/react'
import {Group, Button} from 'harmonium'

const meta = {
  title: 'Layout/Group',
  component: Group,
} satisfies Meta<typeof Group>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Group>
      <Button variant="primary">Save</Button>
      <Button variant="outline">Cancel</Button>
    </Group>
  ),
}

export const SpaceBetween: Story = {
  render: () => (
    <Group justify="between">
      <span>Left content</span>
      <span>Right content</span>
    </Group>
  ),
}

export const Grow: Story = {
  render: () => (
    <Group grow>
      <Button variant="primary">Equal</Button>
      <Button variant="secondary">Width</Button>
      <Button variant="outline">Buttons</Button>
    </Group>
  ),
}
