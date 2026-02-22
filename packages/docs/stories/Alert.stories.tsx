import type {Meta, StoryObj} from '@storybook/react'
import {Alert, Stack} from 'harmonium'

const meta = {
  title: 'Display/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: `Dismissible notification banner for inline messages.

\`\`\`tsx
import { Alert } from 'harmonium'

<Alert variant="success" dismissible onDismiss={() => setShow(false)}>
  Changes saved successfully.
</Alert>
\`\`\`

**Variants:** \`info\` (default), \`success\`, \`warning\`, \`error\`
Set \`dismissible\` and \`onDismiss\` to allow users to close the alert.`,
      },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <Stack gap="sm">
      <Alert variant="info">This is an informational message.</Alert>
      <Alert variant="success">Operation completed successfully.</Alert>
      <Alert variant="warning">Please review before continuing.</Alert>
      <Alert variant="error">Something went wrong.</Alert>
    </Stack>
  ),
}

export const Dismissible: Story = {
  render: () => (
    <Alert variant="info" dismissible onDismiss={() => alert('Dismissed!')}>
      This alert can be dismissed.
    </Alert>
  ),
}
