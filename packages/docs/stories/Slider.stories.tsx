import type {Meta, StoryObj} from '@storybook/react'
import {Slider, Field, FieldLabel} from 'harmonium'

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: `Range slider input. Renders as \`<input type="range">\`.

\`\`\`tsx
import { Slider } from 'harmonium'

<Slider min={0} max={100} value={volume} onChange={handleChange} showValue />
\`\`\`

**Sizes:** \`sm\`, \`md\`, \`lg\`
Set \`showValue\` to display the current value alongside the slider.`,
      },
    },
  },
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
