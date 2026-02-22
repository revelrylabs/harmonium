import type {Meta, StoryObj} from '@storybook/react'
import {Breadcrumbs, BreadcrumbItem} from 'harmonium'

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component: `Navigation breadcrumb trail. Renders as a \`<nav>\` element.

\`\`\`tsx
import { Breadcrumbs, BreadcrumbItem } from 'harmonium'

<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/settings">Settings</BreadcrumbItem>
  <BreadcrumbItem active>Profile</BreadcrumbItem>
</Breadcrumbs>
\`\`\`

Set \`active\` on the last item (renders as \`<span>\` instead of \`<a>\`). Customize the separator with the \`separator\` prop (default: \`"/"\`).`,
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem href="#">Category</BreadcrumbItem>
      <BreadcrumbItem active>Current Page</BreadcrumbItem>
    </Breadcrumbs>
  ),
}

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumbs separator="›">
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Settings</BreadcrumbItem>
      <BreadcrumbItem active>Profile</BreadcrumbItem>
    </Breadcrumbs>
  ),
}
