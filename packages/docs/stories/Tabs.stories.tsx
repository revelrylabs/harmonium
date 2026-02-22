import type {Meta, StoryObj} from '@storybook/react'
import {Tabs, TabsList, TabsTrigger, TabsContent} from 'harmonium'

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: `Tabbed interface for switching between content panels. Supports controlled and uncontrolled modes.

\`\`\`tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'harmonium'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
\`\`\`

Use \`defaultValue\` for uncontrolled, or \`value\` + \`onValueChange\` for controlled.
Each \`TabsTrigger\` and \`TabsContent\` must share the same \`value\` string.`,
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Manage your account settings here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsContent value="notifications">Configure notification preferences.</TabsContent>
    </Tabs>
  ),
}
