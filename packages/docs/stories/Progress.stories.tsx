import type {Meta, StoryObj} from '@storybook/react'
import {Progress, Stack} from 'harmonium'

const meta = {
  title: 'Display/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: `Progress bar showing completion status. Renders with \`role="progressbar"\`.

\`\`\`tsx
import { Progress } from 'harmonium'

<Progress value={75} max={100} showLabel />
\`\`\`

**Variants:** \`primary\`, \`secondary\`, \`success\`, \`warning\`, \`error\`
**Sizes:** \`sm\`, \`md\`, \`lg\`
Set \`showLabel\` to display the percentage.`,
      },
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {value: 60},
}

export const WithLabel: Story = {
  args: {value: 75, showLabel: true, size: 'lg'},
}

export const Variants: Story = {
  render: () => (
    <Stack gap="md">
      <Progress value={80} variant="primary" />
      <Progress value={60} variant="success" />
      <Progress value={40} variant="warning" />
      <Progress value={20} variant="error" />
    </Stack>
  ),
}
