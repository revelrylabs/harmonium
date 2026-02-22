import type {Meta, StoryObj} from '@storybook/react'
import {TopBar, TopBarSection, Button, Avatar} from 'harmonium'

const meta = {
  title: 'Navigation/TopBar',
  component: TopBar,
} satisfies Meta<typeof TopBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TopBar>
      <TopBarSection align="left">
        <strong>Harmonium</strong>
      </TopBarSection>
      <TopBarSection align="right">
        <Button variant="ghost" size="sm">Docs</Button>
        <Button variant="ghost" size="sm">GitHub</Button>
        <Avatar fallback="U" size="sm" />
      </TopBarSection>
    </TopBar>
  ),
}
