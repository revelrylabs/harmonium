import type {Meta, StoryObj} from '@storybook/react'
import {Switch, Stack} from 'harmonium'

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: `Toggle switch for boolean settings. Renders as \`<input type="checkbox" role="switch">\`.

\`\`\`tsx
import { Switch } from 'harmonium'

<Switch label="Dark mode" checked={darkMode} onChange={toggle} />
\`\`\`

**Sizes:** \`sm\`, \`md\`, \`lg\``,
      },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {label: 'Enable notifications'},
}

export const Sizes: Story = {
  render: () => (
    <Stack gap="md">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </Stack>
  ),
}

export const Disabled: Story = {
  args: {label: 'Disabled', disabled: true},
}
