import type {Meta, StoryObj} from '@storybook/react'
import React, {useState} from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Field,
  FieldLabel,
  FieldDescription,
  Input,
  Textarea,
  Select,
  Switch,
  Stack,
  Group,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
} from 'harmonium'

function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <h3 style={{margin: 0}}>Profile</h3>
      </CardHeader>
      <CardBody>
        <Stack gap="lg">
          <Group gap="md" align="center">
            <Avatar fallback="JD" size="lg" />
            <Stack gap="xs">
              <Button variant="outline" size="sm">
                Change avatar
              </Button>
              <p style={{margin: 0, fontSize: '0.75rem', color: '#888'}}>
                JPG, PNG or GIF. 1MB max.
              </p>
            </Stack>
          </Group>
          <Separator />
          <Stack direction={{base: 'vertical', md: 'horizontal'}} gap="md">
            <Field>
              <FieldLabel>First name</FieldLabel>
              <Input defaultValue="Jane" />
            </Field>
            <Field>
              <FieldLabel>Last name</FieldLabel>
              <Input defaultValue="Doe" />
            </Field>
          </Stack>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" defaultValue="jane@example.com" />
          </Field>
          <Field>
            <FieldLabel>Bio</FieldLabel>
            <FieldDescription>
              Brief description for your profile.
            </FieldDescription>
            <Textarea
              defaultValue="Product designer based in Austin, TX."
              rows={3}
            />
          </Field>
        </Stack>
      </CardBody>
      <CardFooter>
        <Group justify="end" gap="sm">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </Group>
      </CardFooter>
    </Card>
  )
}

function NotificationSettings() {
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  return (
    <Card>
      <CardHeader>
        <h3 style={{margin: 0}}>Notifications</h3>
      </CardHeader>
      <CardBody>
        <Stack gap="lg">
          <Group justify="between" align="center">
            <Stack gap="xs">
              <strong>Email notifications</strong>
              <p style={{margin: 0, fontSize: '0.875rem', color: '#666'}}>
                Receive email updates about your account activity.
              </p>
            </Stack>
            <Switch
              label=""
              checked={emailNotifs}
              onChange={() => setEmailNotifs(!emailNotifs)}
            />
          </Group>
          <Separator />
          <Group justify="between" align="center">
            <Stack gap="xs">
              <strong>Push notifications</strong>
              <p style={{margin: 0, fontSize: '0.875rem', color: '#666'}}>
                Receive push notifications on your device.
              </p>
            </Stack>
            <Switch
              label=""
              checked={pushNotifs}
              onChange={() => setPushNotifs(!pushNotifs)}
            />
          </Group>
          <Separator />
          <Group justify="between" align="center">
            <Stack gap="xs">
              <strong>Weekly digest</strong>
              <p style={{margin: 0, fontSize: '0.875rem', color: '#666'}}>
                Get a weekly summary of your activity.
              </p>
            </Stack>
            <Switch
              label=""
              checked={weeklyDigest}
              onChange={() => setWeeklyDigest(!weeklyDigest)}
            />
          </Group>
          <Separator />
          <Group justify="between" align="center">
            <Stack gap="xs">
              <strong>Marketing emails</strong>
              <p style={{margin: 0, fontSize: '0.875rem', color: '#666'}}>
                Receive emails about new features and updates.
              </p>
            </Stack>
            <Switch
              label=""
              checked={marketingEmails}
              onChange={() => setMarketingEmails(!marketingEmails)}
            />
          </Group>
        </Stack>
      </CardBody>
      <CardFooter>
        <Group justify="end" gap="sm">
          <Button variant="outline">Reset</Button>
          <Button variant="primary">Save preferences</Button>
        </Group>
      </CardFooter>
    </Card>
  )
}

function AppearanceSettings() {
  return (
    <Card>
      <CardHeader>
        <h3 style={{margin: 0}}>Appearance</h3>
      </CardHeader>
      <CardBody>
        <Stack gap="lg">
          <Field>
            <FieldLabel>Theme</FieldLabel>
            <FieldDescription>
              Select your preferred color theme.
            </FieldDescription>
            <Select defaultValue="system">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Language</FieldLabel>
            <Select defaultValue="en">
              <option value="en">English</option>
              <option value="es">Espa??ol</option>
              <option value="fr">Fran??ais</option>
              <option value="de">Deutsch</option>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Timezone</FieldLabel>
            <Select defaultValue="america-chicago">
              <option value="america-new_york">
                Eastern Time (US & Canada)
              </option>
              <option value="america-chicago">
                Central Time (US & Canada)
              </option>
              <option value="america-denver">
                Mountain Time (US & Canada)
              </option>
              <option value="america-los_angeles">
                Pacific Time (US & Canada)
              </option>
            </Select>
          </Field>
        </Stack>
      </CardBody>
      <CardFooter>
        <Group justify="end" gap="sm">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </Group>
      </CardFooter>
    </Card>
  )
}

function SettingsPage() {
  return (
    <div style={{maxWidth: 720, margin: '0 auto'}}>
      <Stack gap="lg">
        <div>
          <h1 style={{margin: '0 0 4px', fontSize: '1.75rem'}}>Settings</h1>
          <p style={{margin: 0, color: '#666'}}>
            Manage your account settings and preferences.
          </p>
        </div>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div style={{paddingTop: 16}}>
              <ProfileSettings />
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div style={{paddingTop: 16}}>
              <NotificationSettings />
            </div>
          </TabsContent>
          <TabsContent value="appearance">
            <div style={{paddingTop: 16}}>
              <AppearanceSettings />
            </div>
          </TabsContent>
        </Tabs>
      </Stack>
    </div>
  )
}

const meta: Meta = {
  title: 'Recipes/Settings Page',
  parameters: {
    docs: {
      description: {
        component: `
A tabbed settings page with profile, notification, and appearance sections. Copy-paste and customize for your app.

**Components used:** Tabs, Card, Field, Input, Textarea, Select, Switch, Avatar, Button, Stack, Group, Separator
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <SettingsPage />,
}

export const ProfileTab: StoryObj = {
  render: () => (
    <div style={{maxWidth: 720, margin: '0 auto'}}>
      <ProfileSettings />
    </div>
  ),
}

export const NotificationsTab: StoryObj = {
  render: () => (
    <div style={{maxWidth: 720, margin: '0 auto'}}>
      <NotificationSettings />
    </div>
  ),
}
