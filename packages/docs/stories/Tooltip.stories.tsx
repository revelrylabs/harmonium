import type {Meta, StoryObj} from '@storybook/react'
import {Tooltip, Button, Group} from 'harmonium'

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: `Tooltip that appears on hover and focus. Wraps its children.

\`\`\`tsx
import { Tooltip } from 'harmonium'

<Tooltip content="Save your changes" side="top">
  <Button>Save</Button>
</Tooltip>
\`\`\`

**Side:** \`top\` (default), \`bottom\`, \`left\`, \`right\`
The \`content\` prop accepts any \`ReactNode\`.`,
      },
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
}

export const Positions: Story = {
  render: () => (
    <Group gap="lg" style={{padding: '60px'}}>
      <Tooltip content="Top tooltip" side="top"><Button variant="outline">Top</Button></Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom"><Button variant="outline">Bottom</Button></Tooltip>
      <Tooltip content="Left tooltip" side="left"><Button variant="outline">Left</Button></Tooltip>
      <Tooltip content="Right tooltip" side="right"><Button variant="outline">Right</Button></Tooltip>
    </Group>
  ),
}
