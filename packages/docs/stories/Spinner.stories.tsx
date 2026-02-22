import type {Meta, StoryObj} from '@storybook/react'
import {Spinner, Group} from 'harmonium'

const meta = {
  title: 'Display/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <Group gap="lg" align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Group>
  ),
}

export const CustomLabel: Story = {
  args: {label: 'Saving...'},
}
