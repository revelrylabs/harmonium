import type {Meta, StoryObj} from '@storybook/react'
import {Button} from 'harmonium'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `A clickable button with variant and size options.

\`\`\`tsx
import { Button } from 'harmonium'

<Button variant="primary" size="md">Save</Button>
<Button variant="outline" disabled>Cancel</Button>
\`\`\`

**Variants:** \`primary\`, \`secondary\`, \`outline\`, \`ghost\`
**Sizes:** \`sm\`, \`md\`, \`lg\`
Set \`expanded\` for full-width. Accepts all standard \`<button>\` HTML attributes.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    expanded: {control: 'boolean'},
    disabled: {control: 'boolean'},
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {variant: 'primary'},
}

export const Secondary: Story = {
  args: {variant: 'secondary'},
}

export const Outline: Story = {
  args: {variant: 'outline'},
}

export const Ghost: Story = {
  args: {variant: 'ghost'},
}

export const Small: Story = {
  args: {size: 'sm'},
}

export const Large: Story = {
  args: {size: 'lg'},
}

export const Expanded: Story = {
  args: {expanded: true},
}

export const Disabled: Story = {
  args: {disabled: true},
}
