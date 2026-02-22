import type {Meta, StoryObj} from '@storybook/react'
import {ToastProvider, useToast, Button, Group} from 'harmonium'

const meta = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  parameters: {
    docs: {
      description: {
        component: `Notification toast system. Wrap your app in \`ToastProvider\`, then use the \`useToast\` hook to trigger toasts from any component.

\`\`\`tsx
import { ToastProvider, useToast } from 'harmonium'

// In your app root
<ToastProvider position="bottom-right"><App /></ToastProvider>

// In any component
const { toast, dismiss } = useToast()
toast({ message: 'Saved!', variant: 'success', duration: 5000 })
\`\`\`

**Variants:** \`info\`, \`success\`, \`warning\`, \`error\`
**Position:** \`top-right\`, \`top-left\`, \`bottom-right\` (default), \`bottom-left\`
Set \`duration: 0\` for persistent toasts. Call \`dismiss(id)\` to remove manually.`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

function ToastDemo() {
  const {toast} = useToast()
  return (
    <Group gap="sm">
      <Button variant="outline" onClick={() => toast({message: 'This is an info toast', variant: 'info'})}>Info</Button>
      <Button variant="primary" onClick={() => toast({message: 'Saved successfully!', variant: 'success'})}>Success</Button>
      <Button variant="outline" onClick={() => toast({message: 'Please check your input', variant: 'warning'})}>Warning</Button>
      <Button variant="outline" onClick={() => toast({message: 'Something went wrong', variant: 'error'})}>Error</Button>
    </Group>
  )
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
}
