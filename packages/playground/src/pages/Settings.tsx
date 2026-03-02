import {useState} from 'react'
import {
  Heading,
  Text,
  Stack,
  Group,
  Button,
  Card,
  CardBody,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Field,
  FieldLabel,
  FieldDescription,
  Input,
  Select,
  Switch,
  Separator,
  Alert,
} from 'harmonium'

export function SettingsPage() {
  const [name, setName] = useState('Jane Doe')
  const [email, setEmail] = useState('jane@example.com')
  const [notifications, setNotifications] = useState(true)
  const [emailDigest, setEmailDigest] = useState(false)
  const [theme, setTheme] = useState('system')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <Stack gap="xl" style={{maxWidth: 640}}>
      <Stack gap="xs">
        <Heading level={2} size="lg" style={{letterSpacing: '-0.025em'}}>
          Settings
        </Heading>
        <Text color="muted" size="sm">
          Manage your account preferences
        </Text>
      </Stack>

      {saved && (
        <Alert variant="success" dismissible onDismiss={() => setSaved(false)}>
          Your changes have been saved.
        </Alert>
      )}

      <Card variant="outlined" style={{background: '#fff'}}>
        <CardBody>
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Stack gap="lg">
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <FieldDescription>
                    Used for login and notifications
                  </FieldDescription>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Separator />
                <Group justify="end" gap="sm">
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button variant="primary" size="sm" onClick={handleSave}>
                    Save Changes
                  </Button>
                </Group>
              </Stack>
            </TabsContent>

            <TabsContent value="notifications">
              <Stack gap="md">
                <Group justify="between" align="center" style={{padding: '4px 0'}}>
                  <Stack gap="xs">
                    <Text weight="medium" as="span" size="sm">
                      Push Notifications
                    </Text>
                    <Text size="xs" color="muted" as="span">
                      Get notified when tasks are assigned to you
                    </Text>
                  </Stack>
                  <Switch
                    label="Push notifications"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                </Group>
                <Separator />
                <Group justify="between" align="center" style={{padding: '4px 0'}}>
                  <Stack gap="xs">
                    <Text weight="medium" as="span" size="sm">
                      Weekly Digest
                    </Text>
                    <Text size="xs" color="muted" as="span">
                      Summary of task activity sent every Monday
                    </Text>
                  </Stack>
                  <Switch
                    label="Email digest"
                    checked={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.checked)}
                  />
                </Group>
                <Separator />
                <Group justify="end">
                  <Button variant="primary" size="sm" onClick={handleSave}>
                    Save Preferences
                  </Button>
                </Group>
              </Stack>
            </TabsContent>

            <TabsContent value="appearance">
              <Stack gap="lg">
                <Field>
                  <FieldLabel>Theme</FieldLabel>
                  <FieldDescription>
                    Choose your preferred color scheme
                  </FieldDescription>
                  <Select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </Select>
                </Field>
                <Separator />
                <Group justify="end">
                  <Button variant="primary" size="sm" onClick={handleSave}>
                    Save Preferences
                  </Button>
                </Group>
              </Stack>
            </TabsContent>
          </Tabs>
        </CardBody>
      </Card>
    </Stack>
  )
}
