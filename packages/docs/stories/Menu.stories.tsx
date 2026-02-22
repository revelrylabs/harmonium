import type {Meta, StoryObj} from '@storybook/react'
import {Menu, MenuItem, MenuSeparator, MenuLabel} from 'harmonium'

const meta = {
  title: 'Overlays/Menu',
  component: Menu,
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Menu style={{maxWidth: '240px'}}>
      <MenuLabel>Account</MenuLabel>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuSeparator />
      <MenuLabel>Actions</MenuLabel>
      <MenuItem>Export data</MenuItem>
      <MenuItem variant="danger">Delete account</MenuItem>
    </Menu>
  ),
}
