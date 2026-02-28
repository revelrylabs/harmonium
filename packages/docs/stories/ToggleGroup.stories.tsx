import type {Meta, StoryObj} from '@storybook/react'
import {ToggleGroup, ToggleGroupItem, Stack} from 'harmonium'

const meta = {
  title: 'Navigation/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    docs: {
      description: {
        component: `Segmented control for "pick one of N" selections like view switchers or filter modes.

\`\`\`tsx
import { ToggleGroup, ToggleGroupItem } from 'harmonium'

<ToggleGroup defaultValue="list" onValueChange={setView}>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>
\`\`\`

**Sizes:** \`sm\`, \`md\` (default), \`lg\`
Supports controlled (\`value\` + \`onValueChange\`) and uncontrolled (\`defaultValue\`) modes.
Uses \`role="radiogroup"\` and \`role="radio"\` for accessibility.`,
      },
    },
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ToggleGroup defaultValue="list">
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="board">Board</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Stack gap="md">
      <ToggleGroup defaultValue="a" size="sm">
        <ToggleGroupItem value="a">Small</ToggleGroupItem>
        <ToggleGroupItem value="b">Options</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue="a" size="md">
        <ToggleGroupItem value="a">Medium</ToggleGroupItem>
        <ToggleGroupItem value="b">Options</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue="a" size="lg">
        <ToggleGroupItem value="a">Large</ToggleGroupItem>
        <ToggleGroupItem value="b">Options</ToggleGroupItem>
      </ToggleGroup>
    </Stack>
  ),
}

export const ViewSwitcher: Story = {
  render: () => (
    <ToggleGroup defaultValue="week">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
  ),
}
