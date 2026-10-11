import type {Meta, StoryObj} from '@storybook/react'
import {Show, Stack, Badge} from 'harmonium'

const meta = {
  title: 'Layout/Show',
  component: Show,
  parameters: {
    docs: {
      description: {
        component: `Shows its children only at some screen widths. It hides them with CSS, so they are still rendered.

\`\`\`tsx
import { Show } from 'harmonium'

<Show below="md"><MobileNav /></Show>
<Show above="md"><DesktopNav /></Show>
\`\`\`

**above:** shows at this breakpoint and wider
**below:** shows below this breakpoint (hidden at it and wider)
**Breakpoints:** \`sm\` 640px, \`md\` 768px, \`lg\` 1024px, \`xl\` 1280px. Resize the canvas (or use the viewport toolbar) to see them change.`,
      },
    },
  },
} satisfies Meta<typeof Show>

export default meta
type Story = StoryObj<typeof meta>

export const AboveAndBelow: Story = {
  render: () => (
    <Stack gap="sm">
      <Show below="md">
        <Badge variant="warning">Below md (under 768px)</Badge>
      </Show>
      <Show above="md">
        <Badge variant="success">md and above (768px+)</Badge>
      </Show>
    </Stack>
  ),
}

export const EveryBreakpoint: Story = {
  render: () => (
    <Stack gap="sm">
      <Show below="sm">
        <Badge>Under 640px</Badge>
      </Show>
      <Show above="sm">
        <Badge variant="primary">sm and above</Badge>
      </Show>
      <Show above="md">
        <Badge variant="primary">md and above</Badge>
      </Show>
      <Show above="lg">
        <Badge variant="primary">lg and above</Badge>
      </Show>
      <Show above="xl">
        <Badge variant="primary">xl and above</Badge>
      </Show>
    </Stack>
  ),
}
