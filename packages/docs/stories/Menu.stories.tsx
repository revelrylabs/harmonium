import type {Meta, StoryObj} from '@storybook/react'
import {Menu, MenuItem, MenuSeparator, MenuLabel} from 'harmonium'

const meta = {
  title: 'Overlays/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: `Dropdown menu with items, labels, and separators. Renders with \`role="menu"\`.

\`\`\`tsx
import { Menu, MenuItem, MenuSeparator, MenuLabel } from 'harmonium'

<Menu>
  <MenuLabel>Actions</MenuLabel>
  <MenuItem onClick={handleEdit}>Edit</MenuItem>
  <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
  <MenuSeparator />
  <MenuItem variant="danger" onClick={handleDelete}>Delete</MenuItem>
</Menu>
\`\`\`

\`MenuItem\` accepts \`variant="danger"\` for destructive actions.`,
      },
    },
  },
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
