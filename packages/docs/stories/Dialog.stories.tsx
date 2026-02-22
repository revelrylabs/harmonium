import type {Meta, StoryObj} from '@storybook/react'
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, Group} from 'harmonium'
import {useState} from 'react'

const meta = {
  title: 'Overlays/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: `Modal dialog with backdrop, focus trap, and accessible keyboard navigation. Use with \`DialogHeader\`, \`DialogBody\`, and \`DialogFooter\`.

\`\`\`tsx
import { Dialog, DialogHeader, DialogBody, DialogFooter } from 'harmonium'

<Dialog open={isOpen} onClose={() => setIsOpen(false)} size="md">
  <DialogHeader>Confirm</DialogHeader>
  <DialogBody>Are you sure?</DialogBody>
  <DialogFooter>
    <Button variant="outline" onClick={close}>Cancel</Button>
    <Button onClick={confirm}>Confirm</Button>
  </DialogFooter>
</Dialog>
\`\`\`

**Sizes:** \`sm\`, \`md\`, \`lg\`, \`full\`
Closes on Escape key and backdrop click.`,
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogHeader>Confirm Action</DialogHeader>
          <DialogBody>Are you sure you want to proceed? This action cannot be undone.</DialogBody>
          <DialogFooter>
            <Group>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
            </Group>
          </DialogFooter>
        </Dialog>
      </>
    )
  },
}

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Large Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} size="lg">
          <DialogHeader>Large Dialog</DialogHeader>
          <DialogBody>
            <p>This dialog uses the large size variant for more content.</p>
            <p>It can hold forms, tables, or any complex content.</p>
          </DialogBody>
        </Dialog>
      </>
    )
  },
}
