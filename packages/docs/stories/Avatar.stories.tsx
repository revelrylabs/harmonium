import type {Meta, StoryObj} from '@storybook/react'
import {Avatar, Group} from 'harmonium'

const meta = {
  title: 'Display/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithFallback: Story = {
  args: {fallback: 'JD', size: 'lg'},
}

export const Sizes: Story = {
  render: () => (
    <Group gap="sm" align="center">
      <Avatar fallback="S" size="sm" />
      <Avatar fallback="M" size="md" />
      <Avatar fallback="L" size="lg" />
      <Avatar fallback="XL" size="xl" />
    </Group>
  ),
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=harmonium',
    alt: 'User avatar',
    size: 'lg',
  },
}
