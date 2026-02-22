import type {Meta, StoryObj} from '@storybook/react'
import {Drawer, Button, Stack} from 'harmonium'
import {useState} from 'react'

const meta = {
  title: 'Overlays/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <div style={{padding: 'var(--harmonium-spacing-md)'}}>
            <Stack gap="md">
              <h3>Drawer Content</h3>
              <p>This drawer slides in from the right.</p>
              <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
            </Stack>
          </div>
        </Drawer>
      </>
    )
  },
}

export const Left: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Left Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} side="left">
          <div style={{padding: 'var(--harmonium-spacing-md)'}}>
            <h3>Navigation</h3>
            <p>Left-side drawer for navigation.</p>
          </div>
        </Drawer>
      </>
    )
  },
}
