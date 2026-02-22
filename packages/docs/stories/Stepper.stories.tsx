import type {Meta, StoryObj} from '@storybook/react'
import {Stepper, Step, Button, Group} from 'harmonium'
import {useState} from 'react'

const meta = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component: `Multi-step wizard indicator. Tracks progress through a sequence of steps.

\`\`\`tsx
import { Stepper, Step } from 'harmonium'

<Stepper activeStep={1} orientation="horizontal">
  <Step label="Account" description="Create your account" />
  <Step label="Profile" description="Set up your profile" />
  <Step label="Review" description="Review and submit" />
</Stepper>
\`\`\`

\`activeStep\` is 0-based. Steps before it show as completed, the active step is highlighted, and steps after are pending.
**Orientation:** \`horizontal\` (default), \`vertical\``,
      },
    },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [step, setStep] = useState(1)
    return (
      <div>
        <Stepper activeStep={step}>
          <Step label="Account" description="Create your account" />
          <Step label="Profile" description="Set up your profile" />
          <Step label="Review" description="Review and confirm" />
        </Stepper>
        <Group gap="sm" style={{marginTop: '24px'}}>
          <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</Button>
          <Button onClick={() => setStep((s) => Math.min(3, s + 1))} disabled={step === 3}>Next</Button>
        </Group>
      </div>
    )
  },
}

export const Vertical: Story = {
  render: () => (
    <Stepper activeStep={1} orientation="vertical">
      <Step label="Order Placed" description="Your order has been placed" />
      <Step label="Processing" description="We are preparing your order" />
      <Step label="Shipped" description="Your order is on the way" />
      <Step label="Delivered" description="Package delivered" />
    </Stepper>
  ),
}
