import type {Meta, StoryObj} from '@storybook/react'
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, Group} from 'harmonium'
import {useState} from 'react'

const meta = {
  title: 'Overlays/Dialog',
  component: Dialog,
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
