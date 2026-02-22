import type {Meta, StoryObj} from '@storybook/react'
import {Skeleton, Stack, Group} from 'harmonium'

const meta = {
  title: 'Display/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  render: () => (
    <Stack gap="sm" style={{maxWidth: '300px'}}>
      <Skeleton width="60%" />
      <Skeleton />
      <Skeleton width="80%" />
    </Stack>
  ),
}

export const Card: Story = {
  render: () => (
    <div style={{maxWidth: '300px'}}>
      <Stack gap="sm">
        <Skeleton variant="rectangular" height={200} />
        <Skeleton width="70%" />
        <Skeleton width="40%" />
      </Stack>
    </div>
  ),
}

export const Profile: Story = {
  render: () => (
    <Group gap="md">
      <Skeleton variant="circular" width={48} height={48} />
      <Stack gap="xs" style={{flex: 1}}>
        <Skeleton width="40%" />
        <Skeleton width="60%" />
      </Stack>
    </Group>
  ),
}
