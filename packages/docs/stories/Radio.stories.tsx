import type {Meta, StoryObj} from '@storybook/react'
import {Radio, RadioGroup} from 'harmonium'

const meta = {
  title: 'Forms/Radio',
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup legend="Preferred contact method">
      <Radio name="contact" value="email" label="Email" defaultChecked />
      <Radio name="contact" value="phone" label="Phone" />
      <Radio name="contact" value="mail" label="Mail" />
    </RadioGroup>
  ),
}
