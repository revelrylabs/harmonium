import type {Meta, StoryObj} from '@storybook/react'
import {Sidebar, SidebarSection, SidebarItem} from 'harmonium'

const meta = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    docs: {
      description: {
        component: `Vertical navigation sidebar. Use with \`SidebarSection\` and \`SidebarItem\` for structured nav menus. Supports collapsed (icon-only) mode.

\`\`\`tsx
import { Sidebar, SidebarSection, SidebarItem } from 'harmonium'

<Sidebar>
  <SidebarSection label="Main">
    <SidebarItem active>Dashboard</SidebarItem>
    <SidebarItem>Settings</SidebarItem>
  </SidebarSection>
</Sidebar>
\`\`\`

**Widths:** \`sm\` (200px), \`md\` (260px, default), \`lg\` (320px)
Set \`collapsed\` for icon-only mode. Items accept an \`icon\` prop.`,
      },
    },
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{height: '400px', border: '1px solid var(--harmonium-color-border)', borderRadius: '8px', overflow: 'hidden'}}>
      <Sidebar>
        <SidebarSection label="Navigation">
          <SidebarItem active>Dashboard</SidebarItem>
          <SidebarItem>Projects</SidebarItem>
          <SidebarItem>Team</SidebarItem>
          <SidebarItem>Reports</SidebarItem>
        </SidebarSection>
        <SidebarSection label="Account">
          <SidebarItem>Settings</SidebarItem>
          <SidebarItem>Billing</SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div style={{height: '400px', border: '1px solid var(--harmonium-color-border)', borderRadius: '8px', overflow: 'hidden'}}>
      <Sidebar>
        <SidebarSection>
          <SidebarItem icon={<span>&#9776;</span>} active>Dashboard</SidebarItem>
          <SidebarItem icon={<span>&#9998;</span>}>Projects</SidebarItem>
          <SidebarItem icon={<span>&#9881;</span>}>Settings</SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <div style={{height: '400px', border: '1px solid var(--harmonium-color-border)', borderRadius: '8px', overflow: 'hidden'}}>
      <Sidebar collapsed>
        <SidebarSection>
          <SidebarItem icon={<span>&#9776;</span>}>Dashboard</SidebarItem>
          <SidebarItem icon={<span>&#9998;</span>}>Projects</SidebarItem>
          <SidebarItem icon={<span>&#9881;</span>}>Settings</SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
}
