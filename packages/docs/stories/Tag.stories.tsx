import type {Meta, StoryObj} from '@storybook/react'
import {Tag, Group, Stack} from 'harmonium'

const meta = {
  title: 'Display/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: `Interactive label for filters, categories, and multi-select displays. Supports removable mode with an \`onRemove\` callback.

\`\`\`tsx
import { Tag } from 'harmonium'

<Tag variant="primary">React</Tag>
<Tag variant="success" removable onRemove={() => remove(id)}>Active</Tag>
\`\`\`

**Variants:** \`neutral\`, \`primary\`, \`secondary\`, \`success\`, \`warning\`, \`error\`
**Sizes:** \`sm\`, \`md\`, \`lg\`
Set \`removable\` and \`onRemove\` for dismissible tags. Accepts an \`icon\` prop.`,
      },
    },
  },
  args: {children: 'Tag'},
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <Group gap="sm">
      <Tag variant="neutral">Neutral</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="secondary">Secondary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
    </Group>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Group gap="sm" align="center">
      <Tag size="sm" variant="primary">Small</Tag>
      <Tag size="md" variant="primary">Medium</Tag>
      <Tag size="lg" variant="primary">Large</Tag>
    </Group>
  ),
}

export const Removable: Story = {
  render: () => (
    <Group gap="sm">
      <Tag variant="primary" removable onRemove={() => alert('Removed!')}>React</Tag>
      <Tag variant="secondary" removable onRemove={() => alert('Removed!')}>TypeScript</Tag>
      <Tag variant="success" removable onRemove={() => alert('Removed!')}>CSS</Tag>
    </Group>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Tag variant="primary" icon={<span>&#9733;</span>}>Featured</Tag>
  ),
}
