import type {Meta, StoryObj} from '@storybook/react'
import {EmptyState, Button, Stack} from 'harmonium'

const meta = {
  title: 'Display/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component: `Placeholder for zero-data scenarios in lists, tables, and search results.

\`\`\`tsx
import { EmptyState, Button } from 'harmonium'

<EmptyState
  icon={<span>&#128237;</span>}
  title="No messages"
  description="You haven't received any messages yet."
  action={<Button>Compose</Button>}
/>
\`\`\`

**Sizes:** \`sm\`, \`md\` (default), \`lg\`
Accepts \`icon\`, \`title\`, \`description\`, and \`action\` props.`,
      },
    },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <EmptyState
      title="No results found"
      description="Try adjusting your search or filter to find what you're looking for."
      action={<Button variant="primary">Clear filters</Button>}
    />
  ),
}

export const WithIcon: Story = {
  render: () => (
    <EmptyState
      icon={<span style={{fontSize: '3rem'}}>&#128237;</span>}
      title="No messages"
      description="You haven't received any messages yet."
      action={<Button variant="outline">Compose</Button>}
    />
  ),
}

export const Sizes: Story = {
  render: () => (
    <Stack gap="lg">
      <div style={{border: '1px dashed var(--harmonium-color-border)', borderRadius: '8px'}}>
        <EmptyState size="sm" title="Small empty state" description="Compact for tight spaces." />
      </div>
      <div style={{border: '1px dashed var(--harmonium-color-border)', borderRadius: '8px'}}>
        <EmptyState size="md" title="Medium empty state" description="Default size for most uses." />
      </div>
      <div style={{border: '1px dashed var(--harmonium-color-border)', borderRadius: '8px'}}>
        <EmptyState size="lg" title="Large empty state" description="For prominent empty pages." />
      </div>
    </Stack>
  ),
}
