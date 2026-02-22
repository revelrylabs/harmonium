import type {Meta, StoryObj} from '@storybook/react'
import {Grid, GridCol} from 'harmonium'

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: `CSS Grid layout with configurable columns and gap. Use with \`GridCol\` to span columns.

\`\`\`tsx
import { Grid, GridCol } from 'harmonium'

<Grid columns={12} gap="md">
  <GridCol span={8}>Main content</GridCol>
  <GridCol span={4}>Sidebar</GridCol>
</Grid>
\`\`\`

**Columns:** number (creates \`repeat(N, 1fr)\`) or string (custom template like \`"200px 1fr 200px"\`).
**GridCol \`span\`:** number or string for column span.`,
      },
    },
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const Cell = ({children}: {children: string}) => (
  <div style={{padding: '16px', background: 'var(--harmonium-color-gray-100)', borderRadius: '4px', textAlign: 'center'}}>
    {children}
  </div>
)

export const TwelveColumn: Story = {
  render: () => (
    <Grid columns={12}>
      <GridCol span={4}><Cell>4 cols</Cell></GridCol>
      <GridCol span={4}><Cell>4 cols</Cell></GridCol>
      <GridCol span={4}><Cell>4 cols</Cell></GridCol>
    </Grid>
  ),
}

export const ThreeColumn: Story = {
  render: () => (
    <Grid columns={3}>
      <Cell>Col 1</Cell>
      <Cell>Col 2</Cell>
      <Cell>Col 3</Cell>
    </Grid>
  ),
}

export const CustomTemplate: Story = {
  render: () => (
    <Grid columns="200px 1fr 200px" gap="lg">
      <Cell>Sidebar</Cell>
      <Cell>Main Content</Cell>
      <Cell>Aside</Cell>
    </Grid>
  ),
}
