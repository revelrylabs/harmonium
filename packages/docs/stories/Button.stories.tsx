import type {Meta, StoryObj} from '@storybook/react'
import {Button} from 'harmonium'

const meta = {
  title: 'Components/Button',
  component: Button,
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
