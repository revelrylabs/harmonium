import type {Meta, StoryObj} from '@storybook/react'
import {Progress, Stack} from 'harmonium'

const meta = {
  title: 'Display/Progress',
  component: Progress,
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {value: 60},
}

export const WithLabel: Story = {
  args: {value: 75, showLabel: true, size: 'lg'},
}

export const Variants: Story = {
  render: () => (
    <Stack gap="md">
      <Progress value={80} variant="primary" />
      <Progress value={60} variant="success" />
      <Progress value={40} variant="warning" />
      <Progress value={20} variant="error" />
    </Stack>
  ),
}
