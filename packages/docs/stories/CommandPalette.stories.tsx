import type {Meta, StoryObj} from '@storybook/react'
import {CommandPalette, Button} from 'harmonium'
import {useState} from 'react'

const meta = {
  title: 'Overlays/CommandPalette',
  component: CommandPalette,
  parameters: {
    docs: {
      description: {
        component: `Command-K style searchable command list. Modal overlay that filters items as the user types.

\`\`\`tsx
import { CommandPalette } from 'harmonium'
import type { CommandItem } from 'harmonium'

const items: CommandItem[] = [
  { id: '1', label: 'Go to Dashboard', group: 'Navigation', onSelect: () => navigate('/') },
  { id: '2', label: 'Create Project', group: 'Actions', onSelect: () => create() },
]

<CommandPalette open={isOpen} onClose={close} items={items} />
\`\`\`

Each item needs \`id\`, \`label\`, and \`onSelect\`. Optional \`group\` for grouping under headings. Closes on Escape.`,
      },
    },
  },
} satisfies Meta<typeof CommandPalette>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Command Palette (Cmd+K)</Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          items={[
            {id: '1', label: 'New File', group: 'File', onSelect: () => alert('New File')},
            {id: '2', label: 'Open File', group: 'File', onSelect: () => alert('Open File')},
            {id: '3', label: 'Save', group: 'File', onSelect: () => alert('Save')},
            {id: '4', label: 'Toggle Dark Mode', group: 'Settings', onSelect: () => alert('Toggle Dark Mode')},
            {id: '5', label: 'Change Language', group: 'Settings', onSelect: () => alert('Change Language')},
          ]}
        />
      </>
    )
  },
}
