import type {Meta, StoryObj} from '@storybook/react'
import {Separator, Stack, Group} from 'harmonium'

const meta = {
  title: 'Layout/Separator',
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: `A visual divider between content sections. Renders as an \`<hr>\` element.

\`\`\`tsx
import { Separator } from 'harmonium'

<Separator />
<Separator orientation="vertical" spacing="lg" />
\`\`\`

**Orientation:** \`horizontal\` (default), \`vertical\`
**Spacing:** \`xs\`, \`sm\`, \`md\`, \`lg\`, \`xl\``,
      },
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <Stack>
      <p>Above the separator</p>
      <Separator />
      <p>Below the separator</p>
    </Stack>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Group align="stretch" style={{height: '60px'}}>
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </Group>
  ),
}
