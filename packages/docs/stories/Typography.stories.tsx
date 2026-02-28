import type {Meta, StoryObj} from '@storybook/react'
import {Text, Heading, Stack} from 'harmonium'

const meta = {
  title: 'Display/Typography',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: `Text and Heading primitives wired to the design token system.

\`\`\`tsx
import { Text, Heading } from 'harmonium'

<Heading level={1}>Page Title</Heading>
<Text size="sm" color="muted">Supporting text</Text>
<Text as="span" weight="bold">Inline bold</Text>
\`\`\`

**Text sizes:** \`xs\`, \`sm\`, \`md\`, \`lg\`, \`xl\`
**Text colors:** \`default\`, \`muted\`, \`primary\`, \`success\`, \`warning\`, \`error\`
**Heading levels:** 1–6 (renders \`h1\`–\`h6\`). Visual size auto-maps but can be overridden.`,
      },
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Headings: Story = {
  render: () => (
    <Stack gap="sm">
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </Stack>
  ),
}

export const TextSizes: Story = {
  render: () => (
    <Stack gap="xs">
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text (default)</Text>
      <Text size="lg">Large text</Text>
      <Text size="xl">Extra large text</Text>
    </Stack>
  ),
}

export const TextColors: Story = {
  render: () => (
    <Stack gap="xs">
      <Text color="default">Default color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="primary">Primary color</Text>
      <Text color="success">Success color</Text>
      <Text color="warning">Warning color</Text>
      <Text color="error">Error color</Text>
    </Stack>
  ),
}

export const Weights: Story = {
  render: () => (
    <Stack gap="xs">
      <Text weight="light">Light weight</Text>
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </Stack>
  ),
}

export const Truncated: Story = {
  render: () => (
    <div style={{maxWidth: '200px'}}>
      <Text truncate>
        This is a very long text that should be truncated with an ellipsis
      </Text>
    </div>
  ),
}
