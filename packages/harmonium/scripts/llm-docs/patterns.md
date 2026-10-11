## Common Composition Patterns

### Login Form
```tsx
import { Card, CardBody, CardHeader, Field, FieldLabel, FieldError, Input, Button, Stack } from 'harmonium'
import 'harmonium/styles.css'

function LoginForm() {
  return (
    <Card variant="outlined" style={{ maxWidth: 400 }}>
      <CardHeader>Sign In</CardHeader>
      <CardBody>
        <Stack gap="md">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="you@example.com" />
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input type="password" />
          </Field>
          <Button variant="primary" expanded>Sign In</Button>
        </Stack>
      </CardBody>
    </Card>
  )
}
```

### Settings Page
```tsx
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
  Card, CardBody, Field, FieldLabel, FieldDescription, Input, Select,
  Switch, Stack, Group, Button, Separator, Avatar
} from 'harmonium'
import 'harmonium/styles.css'

function SettingsPage() {
  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardBody>
            <Stack gap="lg">
              <Group gap="md" align="center">
                <Avatar src="/photo.jpg" size="xl" />
                <Button variant="outline" size="sm">Change Photo</Button>
              </Group>
              <Separator />
              <Field>
                <FieldLabel>Display Name</FieldLabel>
                <Input defaultValue="Jane Doe" />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldDescription>Used for notifications</FieldDescription>
                <Input type="email" defaultValue="jane@example.com" />
              </Field>
              <Group justify="end">
                <Button>Save Changes</Button>
              </Group>
            </Stack>
          </CardBody>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardBody>
            <Stack gap="md">
              <Switch label="Email notifications" defaultChecked />
              <Switch label="Push notifications" />
              <Switch label="SMS notifications" />
            </Stack>
          </CardBody>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardBody>
            <Stack gap="md">
              <Field>
                <FieldLabel>Current Password</FieldLabel>
                <Input type="password" />
              </Field>
              <Field>
                <FieldLabel>New Password</FieldLabel>
                <Input type="password" />
              </Field>
              <Group justify="end">
                <Button>Update Password</Button>
              </Group>
            </Stack>
          </CardBody>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
```

### Data Table Page
```tsx
import {
  DataGrid, Card, CardBody, CardHeader, Group, Input, Badge, Button, Pagination
} from 'harmonium'
import 'harmonium/styles.css'

function UsersPage() {
  const columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (user) => (
        <Badge variant={user.status === 'active' ? 'success' : 'neutral'}>
          {user.status}
        </Badge>
      ),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <Group justify="between" align="center">
          <h2>Users</h2>
          <Input placeholder="Search users..." size="sm" style={{ maxWidth: 250 }} />
        </Group>
      </CardHeader>
      <CardBody>
        <DataGrid columns={columns} data={users} rowKey={(u) => u.id} striped hoverable />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </CardBody>
    </Card>
  )
}
```
