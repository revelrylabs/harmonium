import type {Meta, StoryObj} from '@storybook/react'
import {ToastProvider, useToast, Button, Group} from 'harmonium'

const meta = {
  title: 'Feedback/Toast',
  component: ToastProvider,
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
