import type {Meta, StoryObj} from '@storybook/react'
import {Popover, Button, Stack} from 'harmonium'

const meta = {
  title: 'Overlays/Popover',
  component: Popover,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover content={
      <Stack gap="sm">
        <strong>Popover Title</strong>
        <p style={{margin: 0, fontSize: '14px'}}>This is a popover with rich content.</p>
      </Stack>
    }>
      <Button variant="outline">Click me</Button>
    </Popover>
  ),
}
