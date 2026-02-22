import type {Meta, StoryObj} from '@storybook/react'
import {Avatar, Group} from 'harmonium'

const meta = {
  title: 'Display/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `User avatar displaying an image or fallback text (e.g. initials).

\`\`\`tsx
import { Avatar } from 'harmonium'

<Avatar src="/photo.jpg" alt="Jane Doe" size="lg" />
<Avatar fallback="JD" size="md" />
\`\`\`

**Sizes:** \`sm\`, \`md\`, \`lg\`, \`xl\`
Provide \`src\` for an image, or \`fallback\` for text (shown when no image).`,
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithFallback: Story = {
  args: {fallback: 'JD', size: 'lg'},
}

export const Sizes: Story = {
  render: () => (
    <Group gap="sm" align="center">
      <Avatar fallback="S" size="sm" />
      <Avatar fallback="M" size="md" />
      <Avatar fallback="L" size="lg" />
      <Avatar fallback="XL" size="xl" />
    </Group>
  ),
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=harmonium',
    alt: 'User avatar',
    size: 'lg',
  },
}
