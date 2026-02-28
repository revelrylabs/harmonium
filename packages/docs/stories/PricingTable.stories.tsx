import type {Meta, StoryObj} from '@storybook/react'
import {
  PricingTable,
  PricingCard,
  PricingCardHeader,
  PricingCardPrice,
  PricingCardFeatures,
  PricingCardFeature,
  PricingCardFooter,
  Button,
  Badge,
  Stack,
} from 'harmonium'

const meta = {
  title: 'Patterns/PricingTable',
  component: PricingTable,
  parameters: {
    docs: {
      description: {
        component: `Tiered pricing display for SaaS marketing pages. Compose with PricingCard, PricingCardHeader, PricingCardPrice, PricingCardFeatures, PricingCardFeature, and PricingCardFooter.

\`\`\`tsx
import { PricingTable, PricingCard, PricingCardHeader, PricingCardPrice, PricingCardFeatures, PricingCardFeature, PricingCardFooter, Button } from 'harmonium'

<PricingTable>
  <PricingCard>
    <PricingCardHeader>Free</PricingCardHeader>
    <PricingCardPrice amount="$0" period="/month" />
    <PricingCardFeatures>
      <PricingCardFeature>5 projects</PricingCardFeature>
      <PricingCardFeature included={false}>Custom domain</PricingCardFeature>
    </PricingCardFeatures>
    <PricingCardFooter><Button expanded>Get Started</Button></PricingCardFooter>
  </PricingCard>
</PricingTable>
\`\`\`

Set \`featured\` on a PricingCard to highlight the recommended plan. Features accept \`included={false}\` for crossed-out items.`,
      },
    },
  },
} satisfies Meta<typeof PricingTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PricingTable columns={3}>
      <PricingCard>
        <PricingCardHeader>
          <Stack gap="xs">
            <strong style={{fontSize: '1.125rem'}}>Starter</strong>
            <span style={{fontSize: '0.875rem', color: 'var(--harmonium-color-text-muted)'}}>For individuals</span>
          </Stack>
        </PricingCardHeader>
        <PricingCardPrice amount="$0" period="/month" />
        <PricingCardFeatures>
          <PricingCardFeature>5 projects</PricingCardFeature>
          <PricingCardFeature>1 GB storage</PricingCardFeature>
          <PricingCardFeature>Community support</PricingCardFeature>
          <PricingCardFeature included={false}>Custom domain</PricingCardFeature>
          <PricingCardFeature included={false}>Analytics</PricingCardFeature>
        </PricingCardFeatures>
        <PricingCardFooter>
          <Button variant="outline" expanded>Get Started</Button>
        </PricingCardFooter>
      </PricingCard>

      <PricingCard featured>
        <PricingCardHeader>
          <Stack gap="xs">
            <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <strong style={{fontSize: '1.125rem'}}>Pro</strong>
              <Badge variant="primary" size="sm">Popular</Badge>
            </span>
            <span style={{fontSize: '0.875rem', color: 'var(--harmonium-color-text-muted)'}}>For teams</span>
          </Stack>
        </PricingCardHeader>
        <PricingCardPrice amount="$29" period="/month" />
        <PricingCardFeatures>
          <PricingCardFeature>Unlimited projects</PricingCardFeature>
          <PricingCardFeature>50 GB storage</PricingCardFeature>
          <PricingCardFeature>Priority support</PricingCardFeature>
          <PricingCardFeature>Custom domain</PricingCardFeature>
          <PricingCardFeature included={false}>Advanced analytics</PricingCardFeature>
        </PricingCardFeatures>
        <PricingCardFooter>
          <Button variant="primary" expanded>Upgrade to Pro</Button>
        </PricingCardFooter>
      </PricingCard>

      <PricingCard>
        <PricingCardHeader>
          <Stack gap="xs">
            <strong style={{fontSize: '1.125rem'}}>Enterprise</strong>
            <span style={{fontSize: '0.875rem', color: 'var(--harmonium-color-text-muted)'}}>For organizations</span>
          </Stack>
        </PricingCardHeader>
        <PricingCardPrice amount="$99" period="/month" />
        <PricingCardFeatures>
          <PricingCardFeature>Unlimited projects</PricingCardFeature>
          <PricingCardFeature>Unlimited storage</PricingCardFeature>
          <PricingCardFeature>24/7 dedicated support</PricingCardFeature>
          <PricingCardFeature>Custom domain</PricingCardFeature>
          <PricingCardFeature>Advanced analytics</PricingCardFeature>
        </PricingCardFeatures>
        <PricingCardFooter>
          <Button variant="outline" expanded>Contact Sales</Button>
        </PricingCardFooter>
      </PricingCard>
    </PricingTable>
  ),
}
