import type {Meta, StoryObj} from '@storybook/react'
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from 'harmonium'

const meta = {
  title: 'Navigation/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: `Expandable/collapsible content sections. Supports single or multiple open items.

\`\`\`tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'harmonium'

<Accordion defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">Section Title</AccordionTrigger>
    <AccordionContent value="item-1">Section content</AccordionContent>
  </AccordionItem>
</Accordion>
\`\`\`

Set \`multiple\` to allow multiple sections open at once. Use \`defaultValue\` for uncontrolled, or \`value\` + \`onValueChange\` for controlled.`,
      },
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  render: () => (
    <Accordion defaultValue="item-1" style={{maxWidth: '500px'}}>
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">What is Harmonium?</AccordionTrigger>
        <AccordionContent value="item-1">
          A complete React design system out of the box. Ship products, not utility classes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">How do I theme it?</AccordionTrigger>
        <AccordionContent value="item-2">
          Override CSS custom properties. No Sass, no build tools, just CSS.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger value="item-3">Is it accessible?</AccordionTrigger>
        <AccordionContent value="item-3">
          Yes. All interactive components include proper ARIA attributes and keyboard navigation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion multiple defaultValue={['item-1', 'item-2']} style={{maxWidth: '500px'}}>
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">Section One</AccordionTrigger>
        <AccordionContent value="item-1">Content for section one.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">Section Two</AccordionTrigger>
        <AccordionContent value="item-2">Content for section two.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
