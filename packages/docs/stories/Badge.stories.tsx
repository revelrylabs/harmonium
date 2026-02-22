import type {Meta, StoryObj} from '@storybook/react'
import {Badge, Group} from 'harmonium'

const meta = {
  title: 'Display/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `Small status label for tags, counts, or status indicators.

\`\`\`tsx
import { Badge } from 'harmonium'

<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">Overdue</Badge>
\`\`\`

**Variants:** \`neutral\`, \`primary\`, \`secondary\`, \`success\`, \`warning\`, \`error\`
**Sizes:** \`sm\`, \`md\`, \`lg\``,
      },
    },
  },
  args: {children: 'Badge'},
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <Group gap="sm">
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </Group>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Group gap="sm" align="center">
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
      <Badge size="lg" variant="primary">Large</Badge>
    </Group>
  ),
}
