import type {Meta, StoryObj} from '@storybook/react'
import {Stack} from 'harmonium'

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    children: undefined,
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({children}: {children: string}) => (
  <div style={{padding: '16px', background: 'var(--harmonium-color-gray-100)', borderRadius: '4px'}}>
    {children}
  </div>
)

export const Vertical: Story = {
  render: (args) => (
    <Stack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
}

export const Horizontal: Story = {
  render: (args) => (
    <Stack {...args} direction="horizontal">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
}

export const WithGap: Story = {
  render: () => (
    <Stack gap="xl">
      <Box>Large gap</Box>
      <Box>Between items</Box>
    </Stack>
  ),
}

export const Centered: Story = {
  render: () => (
    <Stack direction="horizontal" align="center" justify="center" style={{height: '200px', border: '1px dashed var(--harmonium-color-border)'}}>
      <Box>Centered</Box>
    </Stack>
  ),
}
