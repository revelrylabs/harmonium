import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {
  Button,
  Card,
  CardBody,
  Grid,
  GridCol,
  Stack,
  Group,
  Badge,
  Separator,
  Avatar,
} from 'harmonium'

function Hero() {
  return (
    <div style={{textAlign: 'center', padding: '80px 24px'}}>
      <Stack gap="lg" align="center">
        <Badge variant="primary">Now in beta</Badge>
        <h1 style={{margin: 0, fontSize: '3rem', fontWeight: 700, maxWidth: 640, lineHeight: 1.15}}>
          Build beautiful apps without the hassle
        </h1>
        <p style={{margin: 0, fontSize: '1.25rem', color: '#555', maxWidth: 540, lineHeight: 1.6}}>
          A complete React design system. Install, import, and ship — no utility classes, no copy-paste, no assembly required.
        </p>
        <Group gap="md">
          <Button variant="primary" size="lg">Get started</Button>
          <Button variant="outline" size="lg">View docs</Button>
        </Group>
        <div style={{
          marginTop: 24,
          background: '#f4f4f4',
          borderRadius: 8,
          padding: '12px 24px',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          color: '#333',
        }}>
          npm install harmonium
        </div>
      </Stack>
    </div>
  )
}

const features = [
  {
    title: 'Zero Runtime CSS',
    description: 'CSS Modules at build time. No Emotion, no styled-components, no JS style injection. RSC compatible.',
  },
  {
    title: '50 Components',
    description: 'Everything from buttons to data grids, forms to overlays. Pre-built, accessible, and styled.',
  },
  {
    title: '~20 KB Gzipped',
    description: 'The entire library — JS and CSS — weighs less than most frameworks ship for a single component.',
  },
  {
    title: 'Plain CSS Theming',
    description: 'Override CSS custom properties in a stylesheet. No providers, no JS objects, no build plugins.',
  },
  {
    title: 'Accessible by Default',
    description: 'Built on Base UI primitives with WCAG 2.1 AA, keyboard navigation, and focus traps baked in.',
  },
  {
    title: 'LLM-Friendly',
    description: 'Ships context files so AI tools generate correct code. Typed enum props, no class guessing.',
  },
]

function Features() {
  return (
    <div style={{padding: '64px 24px', background: '#f8f9fa'}}>
      <Stack gap="lg" align="center">
        <div style={{textAlign: 'center'}}>
          <h2 style={{margin: '0 0 8px', fontSize: '2rem'}}>Why Harmonium?</h2>
          <p style={{margin: 0, color: '#666', maxWidth: 480}}>
            Everything you need to ship products, nothing you don&apos;t.
          </p>
        </div>
        <Grid columns={{base: 1, md: 2, lg: 3}} gap="md" style={{maxWidth: 960, width: '100%'}}>
          {features.map((f) => (
            <GridCol key={f.title}>
              <Card style={{height: '100%'}}>
                <CardBody>
                  <Stack gap="sm">
                    <h3 style={{margin: 0, fontSize: '1.125rem'}}>{f.title}</h3>
                    <p style={{margin: 0, fontSize: '0.875rem', color: '#555', lineHeight: 1.6}}>
                      {f.description}
                    </p>
                  </Stack>
                </CardBody>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </Stack>
    </div>
  )
}

const testimonials = [
  {name: 'Sarah Chen', role: 'Frontend Lead, TechCorp', quote: 'We replaced MUI and cut our bundle size by 80%. Theming with plain CSS is a game-changer.'},
  {name: 'Marcus Rivera', role: 'Indie Developer', quote: 'I shipped a complete SaaS UI in a weekend. No config, no fighting the framework.'},
  {name: 'Priya Patel', role: 'Design Engineer, StartupXYZ', quote: 'The AI context files are brilliant. Claude generates correct Harmonium code every time.'},
]

function Testimonials() {
  return (
    <div style={{padding: '64px 24px'}}>
      <Stack gap="lg" align="center">
        <h2 style={{margin: 0, fontSize: '2rem', textAlign: 'center'}}>
          Loved by developers
        </h2>
        <Grid columns={{base: 1, md: 2, lg: 3}} gap="md" style={{maxWidth: 960, width: '100%'}}>
          {testimonials.map((t) => (
            <GridCol key={t.name}>
              <Card style={{height: '100%'}}>
                <CardBody>
                  <Stack gap="md">
                    <p style={{margin: 0, fontSize: '0.875rem', color: '#555', lineHeight: 1.6, fontStyle: 'italic'}}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <Group gap="sm" align="center">
                      <Avatar fallback={t.name.split(' ').map((n) => n[0]).join('')} size="sm" />
                      <div>
                        <strong style={{fontSize: '0.875rem'}}>{t.name}</strong>
                        <p style={{margin: 0, fontSize: '0.75rem', color: '#888'}}>
                          {t.role}
                        </p>
                      </div>
                    </Group>
                  </Stack>
                </CardBody>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </Stack>
    </div>
  )
}

function CTA() {
  return (
    <div style={{padding: '80px 24px', textAlign: 'center', background: '#f8f9fa'}}>
      <Stack gap="lg" align="center">
        <h2 style={{margin: 0, fontSize: '2rem'}}>Ready to ship?</h2>
        <p style={{margin: 0, color: '#555', maxWidth: 480, lineHeight: 1.6}}>
          Get started with Harmonium in under a minute. One install, zero configuration.
        </p>
        <Group gap="md">
          <Button variant="primary" size="lg">Get started</Button>
          <Button variant="outline" size="lg">GitHub</Button>
        </Group>
      </Stack>
    </div>
  )
}

function MarketingPage() {
  return (
    <div>
      <Hero />
      <Separator />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  )
}

const meta: Meta = {
  title: 'Recipes/Marketing Page',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A marketing landing page with hero, feature grid, testimonials, and CTA. Copy-paste and customize for your product.

**Components used:** Button, Card, Grid, Stack, Group, Badge, Avatar, Separator
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <MarketingPage />,
}
