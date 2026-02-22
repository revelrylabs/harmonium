import type {Meta, StoryObj} from '@storybook/react'
import {Card, CardHeader, CardBody, CardFooter, Button, Group} from 'harmonium'

const meta = {
  title: 'Display/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `Content container with header, body, and footer sections. Use with \`CardHeader\`, \`CardBody\`, and \`CardFooter\`.

\`\`\`tsx
import { Card, CardHeader, CardBody, CardFooter } from 'harmonium'

<Card variant="outlined">
  <CardHeader>Title</CardHeader>
  <CardBody>Content goes here</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
\`\`\`

**Variants:** \`elevated\` (default, with shadow), \`outlined\` (border), \`filled\` (subtle background)
**Padding:** \`none\`, \`sm\`, \`md\` (default), \`lg\``,
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Elevated: Story = {
  render: () => (
    <Card style={{maxWidth: '400px'}}>
      <CardHeader>Card Title</CardHeader>
      <CardBody>This is the card body with some content inside it.</CardBody>
      <CardFooter>
        <Group justify="end">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Save</Button>
        </Group>
      </CardFooter>
    </Card>
  ),
}

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" style={{maxWidth: '400px'}}>
      <CardBody>An outlined card variant.</CardBody>
    </Card>
  ),
}

export const Filled: Story = {
  render: () => (
    <Card variant="filled" style={{maxWidth: '400px'}}>
      <CardBody>A filled card with subtle background.</CardBody>
    </Card>
  ),
}
