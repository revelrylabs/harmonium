import type {Meta, StoryObj} from '@storybook/react'
import {Stat, Group, Stack} from 'harmonium'

const meta = {
  title: 'Display/Stat',
  component: Stat,
  parameters: {
    docs: {
      description: {
        component: `Dashboard KPI card for displaying metrics with optional trend indicators.

\`\`\`tsx
import { Stat } from 'harmonium'

<Stat label="Revenue" value="$12,400" change="+12%" trend="up" />
<Stat label="Users" value={1234} change="-3%" trend="down" />
\`\`\`

Accepts \`label\`, \`value\`, \`change\`, \`trend\` (\`up\`, \`down\`, \`neutral\`), and \`icon\`.`,
      },
    },
  },
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{maxWidth: '240px'}}>
      <Stat label="Revenue" value="$12,400" change="+12.5%" trend="up" />
    </div>
  ),
}

export const Dashboard: Story = {
  render: () => (
    <Group gap="md" wrap>
      <Stat label="Total Revenue" value="$45,231" change="+20.1%" trend="up" style={{flex: '1 1 200px'}} />
      <Stat label="Subscriptions" value="2,350" change="+180" trend="up" style={{flex: '1 1 200px'}} />
      <Stat label="Active Users" value="12,234" change="-2.3%" trend="down" style={{flex: '1 1 200px'}} />
      <Stat label="Bounce Rate" value="21.4%" change="0%" trend="neutral" style={{flex: '1 1 200px'}} />
    </Group>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div style={{maxWidth: '240px'}}>
      <Stat
        label="Monthly Visitors"
        value="48.2K"
        change="+8.1%"
        trend="up"
        icon={<span style={{fontSize: '1.25rem'}}>&#128200;</span>}
      />
    </div>
  ),
}
