import type {Meta, StoryObj} from '@storybook/react'
import React, {useState} from 'react'
import {
  PricingTable,
  PricingCard,
  PricingCardHeader,
  PricingCardPrice,
  PricingCardFeatures,
  PricingCardFeature,
  PricingCardFooter,
  Button,
  Stack,
  Group,
  Badge,
  ToggleGroup,
  ToggleGroupItem,
} from 'harmonium'

function BasicPricing() {
  return (
    <div style={{maxWidth: 960, margin: '0 auto', padding: '64px 24px'}}>
      <Stack gap="lg" align="center">
        <div style={{textAlign: 'center'}}>
          <h1 style={{margin: '0 0 8px', fontSize: '2rem'}}>
            Simple, transparent pricing
          </h1>
          <p style={{margin: 0, color: '#666', maxWidth: 480}}>
            No hidden fees. No surprises. Pick a plan and start building.
          </p>
        </div>

        <PricingTable>
          <PricingCard>
            <PricingCardHeader>Starter</PricingCardHeader>
            <PricingCardPrice amount="$0" period="/month" />
            <PricingCardFeatures>
              <PricingCardFeature>Up to 3 projects</PricingCardFeature>
              <PricingCardFeature>1 GB storage</PricingCardFeature>
              <PricingCardFeature>Community support</PricingCardFeature>
              <PricingCardFeature included={false}>
                Custom domains
              </PricingCardFeature>
              <PricingCardFeature included={false}>
                Analytics
              </PricingCardFeature>
            </PricingCardFeatures>
            <PricingCardFooter>
              <Button variant="outline" expanded>
                Get started free
              </Button>
            </PricingCardFooter>
          </PricingCard>

          <PricingCard featured>
            <PricingCardHeader>
              <Group gap="sm" align="center">
                Pro
                <Badge variant="primary" size="sm">
                  Popular
                </Badge>
              </Group>
            </PricingCardHeader>
            <PricingCardPrice amount="$29" period="/month" />
            <PricingCardFeatures>
              <PricingCardFeature>Unlimited projects</PricingCardFeature>
              <PricingCardFeature>50 GB storage</PricingCardFeature>
              <PricingCardFeature>Priority support</PricingCardFeature>
              <PricingCardFeature>Custom domains</PricingCardFeature>
              <PricingCardFeature>Analytics</PricingCardFeature>
            </PricingCardFeatures>
            <PricingCardFooter>
              <Button variant="primary" expanded>
                Start free trial
              </Button>
            </PricingCardFooter>
          </PricingCard>

          <PricingCard>
            <PricingCardHeader>Enterprise</PricingCardHeader>
            <PricingCardPrice amount="$99" period="/month" />
            <PricingCardFeatures>
              <PricingCardFeature>Unlimited everything</PricingCardFeature>
              <PricingCardFeature>500 GB storage</PricingCardFeature>
              <PricingCardFeature>Dedicated support</PricingCardFeature>
              <PricingCardFeature>Custom domains</PricingCardFeature>
              <PricingCardFeature>Advanced analytics</PricingCardFeature>
            </PricingCardFeatures>
            <PricingCardFooter>
              <Button variant="outline" expanded>
                Contact sales
              </Button>
            </PricingCardFooter>
          </PricingCard>
        </PricingTable>
      </Stack>
    </div>
  )
}

function PricingWithToggle() {
  const [billing, setBilling] = useState('monthly')

  const prices = {
    monthly: {starter: '$0', pro: '$29', enterprise: '$99'},
    annual: {starter: '$0', pro: '$24', enterprise: '$79'},
  }

  const current = prices[billing as keyof typeof prices]

  return (
    <div style={{maxWidth: 960, margin: '0 auto', padding: '64px 24px'}}>
      <Stack gap="lg" align="center">
        <div style={{textAlign: 'center'}}>
          <h1 style={{margin: '0 0 8px', fontSize: '2rem'}}>
            Choose your plan
          </h1>
          <p style={{margin: 0, color: '#666', maxWidth: 480}}>
            Save 20% with annual billing.
          </p>
        </div>

        <ToggleGroup
          value={billing}
          onChange={(val) => val && setBilling(val)}
        >
          <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
          <ToggleGroupItem value="annual">
            Annual{' '}
            <Badge variant="success" size="sm">
              Save 20%
            </Badge>
          </ToggleGroupItem>
        </ToggleGroup>

        <PricingTable>
          <PricingCard>
            <PricingCardHeader>Starter</PricingCardHeader>
            <PricingCardPrice
              amount={current.starter}
              period={billing === 'annual' ? '/mo, billed yearly' : '/month'}
            />
            <PricingCardFeatures>
              <PricingCardFeature>Up to 3 projects</PricingCardFeature>
              <PricingCardFeature>1 GB storage</PricingCardFeature>
              <PricingCardFeature>Community support</PricingCardFeature>
            </PricingCardFeatures>
            <PricingCardFooter>
              <Button variant="outline" expanded>
                Get started free
              </Button>
            </PricingCardFooter>
          </PricingCard>

          <PricingCard featured>
            <PricingCardHeader>
              <Group gap="sm" align="center">
                Pro
                <Badge variant="primary" size="sm">
                  Popular
                </Badge>
              </Group>
            </PricingCardHeader>
            <PricingCardPrice
              amount={current.pro}
              period={billing === 'annual' ? '/mo, billed yearly' : '/month'}
            />
            <PricingCardFeatures>
              <PricingCardFeature>Unlimited projects</PricingCardFeature>
              <PricingCardFeature>50 GB storage</PricingCardFeature>
              <PricingCardFeature>Priority support</PricingCardFeature>
              <PricingCardFeature>Custom domains</PricingCardFeature>
              <PricingCardFeature>Analytics</PricingCardFeature>
            </PricingCardFeatures>
            <PricingCardFooter>
              <Button variant="primary" expanded>
                Start free trial
              </Button>
            </PricingCardFooter>
          </PricingCard>

          <PricingCard>
            <PricingCardHeader>Enterprise</PricingCardHeader>
            <PricingCardPrice
              amount={current.enterprise}
              period={billing === 'annual' ? '/mo, billed yearly' : '/month'}
            />
            <PricingCardFeatures>
              <PricingCardFeature>Unlimited everything</PricingCardFeature>
              <PricingCardFeature>500 GB storage</PricingCardFeature>
              <PricingCardFeature>Dedicated support</PricingCardFeature>
              <PricingCardFeature>Custom domains</PricingCardFeature>
              <PricingCardFeature>Advanced analytics</PricingCardFeature>
            </PricingCardFeatures>
            <PricingCardFooter>
              <Button variant="outline" expanded>
                Contact sales
              </Button>
            </PricingCardFooter>
          </PricingCard>
        </PricingTable>
      </Stack>
    </div>
  )
}

const meta: Meta = {
  title: 'Recipes/Pricing Page',
  parameters: {
    docs: {
      description: {
        component: `
Pricing page layouts with the PricingTable component. Includes a basic 3-tier layout and a variant with monthly/annual billing toggle. Copy-paste and customize for your product.

**Components used:** PricingTable, PricingCard, Button, Badge, ToggleGroup, Stack, Group
        `,
      },
    },
  },
}

export default meta

export const ThreeTier: StoryObj = {
  render: () => <BasicPricing />,
}

export const WithBillingToggle: StoryObj = {
  render: () => <PricingWithToggle />,
}
