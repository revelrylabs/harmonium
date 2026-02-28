import type {Meta, StoryObj} from '@storybook/react'
import {Container, Stack} from 'harmonium'

const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    docs: {
      description: {
        component: `Responsive max-width wrapper for centering page content.

\`\`\`tsx
import { Container } from 'harmonium'

<Container size="lg" padding="md">
  <h1>Page content</h1>
</Container>
\`\`\`

**Sizes:** \`sm\` (640px), \`md\` (768px), \`lg\` (1024px), \`xl\` (1280px), \`full\`
**Padding:** \`none\`, \`sm\`, \`md\` (default), \`lg\``,
      },
    },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

const Inner = () => (
  <div style={{padding: '24px', background: 'var(--harmonium-color-gray-50)', borderRadius: '8px'}}>
    Container content
  </div>
)

export const Default: Story = {
  render: () => (
    <Container>
      <Inner />
    </Container>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Stack gap="md">
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <Container key={size} size={size} style={{border: '1px dashed var(--harmonium-color-border)'}}>
          <div style={{padding: '12px', background: 'var(--harmonium-color-gray-50)', fontSize: '14px'}}>
            size=&quot;{size}&quot;
          </div>
        </Container>
      ))}
    </Stack>
  ),
}
