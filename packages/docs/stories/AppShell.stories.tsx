import type {Meta, StoryObj} from '@storybook/react'
import {
  AppShell,
  AppShellHeader,
  AppShellSidebar,
  AppShellMain,
  AppShellFooter,
  TopBar,
  TopBarSection,
  Sidebar,
  SidebarSection,
  SidebarItem,
  Button,
} from 'harmonium'

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    docs: {
      description: {
        component: `Full page scaffold with header, sidebar, main content, and footer regions. Composes with TopBar and Sidebar for complete app layouts.

\`\`\`tsx
import { AppShell, AppShellHeader, AppShellSidebar, AppShellMain, AppShellFooter } from 'harmonium'

<AppShell>
  <AppShellHeader><TopBar>...</TopBar></AppShellHeader>
  <AppShellSidebar><Sidebar>...</Sidebar></AppShellSidebar>
  <AppShellMain>Page content</AppShellMain>
  <AppShellFooter>Footer</AppShellFooter>
</AppShell>
\`\`\`

Uses CSS Grid with \`min-height: 100vh\`. Sidebar hides on mobile breakpoints.`,
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell style={{height: '500px', minHeight: 'auto', border: '1px solid var(--harmonium-color-border)', borderRadius: '8px', overflow: 'hidden'}}>
      <AppShellHeader>
        <TopBar>
          <TopBarSection align="left"><strong>My App</strong></TopBarSection>
          <TopBarSection align="right">
            <Button variant="ghost" size="sm">Settings</Button>
          </TopBarSection>
        </TopBar>
      </AppShellHeader>
      <AppShellSidebar>
        <Sidebar width="sm">
          <SidebarSection label="Main">
            <SidebarItem active>Dashboard</SidebarItem>
            <SidebarItem>Projects</SidebarItem>
            <SidebarItem>Reports</SidebarItem>
          </SidebarSection>
        </Sidebar>
      </AppShellSidebar>
      <AppShellMain>
        <h2 style={{margin: 0}}>Dashboard</h2>
        <p style={{color: 'var(--harmonium-color-text-muted)'}}>Main content area</p>
      </AppShellMain>
      <AppShellFooter>
        <span style={{fontSize: '0.875rem', color: 'var(--harmonium-color-text-muted)'}}>
          &copy; 2026 My App
        </span>
      </AppShellFooter>
    </AppShell>
  ),
}
