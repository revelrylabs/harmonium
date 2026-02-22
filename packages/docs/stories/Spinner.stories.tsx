import type {Meta, StoryObj} from '@storybook/react'
import {Spinner, Group} from 'harmonium'

const meta = {
  title: 'Display/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: `Loading indicator with an accessible label for screen readers.

\`\`\`tsx
import { Spinner } from 'harmonium'

<Spinner size="lg" />
<Spinner size="sm" label="Saving..." />
\`\`\`

**Sizes:** \`sm\`, \`md\`, \`lg\`
The \`label\` prop defaults to \`"Loading"\` and is read by screen readers.`,
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <Group gap="lg" align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Group>
  ),
}

export const CustomLabel: Story = {
  args: {label: 'Saving...'},
}
