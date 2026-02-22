import type {Meta, StoryObj} from '@storybook/react'
import {Slider, Field, FieldLabel} from 'harmonium'

const meta = {
  title: 'Forms/Slider',
  component: Slider,
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Volume</FieldLabel>
      <Slider defaultValue={50} showValue />
    </Field>
  ),
}

export const Range: Story = {
  render: () => (
    <Field>
      <FieldLabel>Price range</FieldLabel>
      <Slider min={0} max={500} step={10} defaultValue={250} showValue />
    </Field>
  ),
}
