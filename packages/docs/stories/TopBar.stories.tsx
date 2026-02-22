import type {Meta, StoryObj} from '@storybook/react'
import {TopBar, TopBarSection, Button, Avatar} from 'harmonium'

const meta = {
  title: 'Navigation/TopBar',
  component: TopBar,
  parameters: {
    docs: {
      description: {
        component: `Application header bar. Renders as a \`<header>\`. Use \`TopBarSection\` to align content left, center, or right.

\`\`\`tsx
import { TopBar, TopBarSection } from 'harmonium'

<TopBar>
  <TopBarSection align="left"><strong>My App</strong></TopBarSection>
  <TopBarSection align="right"><Avatar src="/me.jpg" size="sm" /></TopBarSection>
</TopBar>
\`\`\`

Set \`fixed\` for sticky positioning at the top of the viewport.`,
      },
    },
  },
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
