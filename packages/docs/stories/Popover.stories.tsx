import type {Meta, StoryObj} from '@storybook/react'
import {Popover, Button, Stack} from 'harmonium'

const meta = {
  title: 'Overlays/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component: `Click-triggered floating content panel. Wraps its children.

\`\`\`tsx
import { Popover } from 'harmonium'

<Popover content={<div>Rich content here</div>} side="bottom">
  <Button variant="outline">Options</Button>
</Popover>
\`\`\`

**Side:** \`top\`, \`bottom\` (default), \`left\`, \`right\`
Use \`open\` + \`onOpenChange\` for controlled mode.`,
      },
    },
  },
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
