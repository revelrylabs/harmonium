import * as React from 'react'
import {describe, it, expect} from 'vitest'
import {act, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {configureAxe} from 'vitest-axe'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
  Avatar,
  Badge,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Combobox,
  CommandPalette,
  Container,
  DataGrid,
  DatePicker,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Drawer,
  EmptyState,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FileUpload,
  Grid,
  GridCol,
  Group,
  Heading,
  Input,
  Menu,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MultiSelect,
  NumberInput,
  Pagination,
  Popover,
  PricingCard,
  PricingCardFeature,
  PricingCardFeatures,
  PricingCardFooter,
  PricingCardHeader,
  PricingCardPrice,
  PricingTable,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Separator,
  Show,
  Sidebar,
  SidebarItem,
  SidebarSection,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  Stat,
  Step,
  Stepper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Text,
  Textarea,
  TimePicker,
  ToastProvider,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TopBar,
  TopBarSection,
  useToast,
} from './components'

// Every exported component, in each state that changes its markup or ARIA
// (the states shown in Storybook). Component-specific behaviour lives in each
// component's own tests; this file only asks axe about the rendered page.
//
// Axe runs on document.body so portalled popups (Dialog, Popover, Tooltip,
// Menu, Toast, ...) are included. Two rules are off:
// - color-contrast: jsdom does no layout or CSS cascade, so axe can't compute
//   colours. Contrast is checked on the tokens instead (#753).
// - region: components are rendered alone, not as a page, so "all content is
//   inside a landmark" is the app's job, not the component's.
const axe = configureAxe({
  rules: {'color-contrast': {enabled: false}, region: {enabled: false}},
})

type User = ReturnType<typeof userEvent.setup>

interface Case {
  name: string
  ui: React.ReactElement
  /** Put the component into the state under test (open a popup, ...) */
  act?: (user: User) => Promise<void>
}

const options = [
  {value: 'react', label: 'React'},
  {value: 'vue', label: 'Vue'},
  {value: 'svelte', label: 'Svelte'},
]

const commands = [
  {id: '1', label: 'New File', group: 'File', onSelect: () => {}},
  {id: '2', label: 'Save', group: 'File', onSelect: () => {}},
  {id: '3', label: 'Toggle Dark Mode', group: 'Settings', onSelect: () => {}},
]

interface Person {
  id: number
  name: string
  role: string
}

const people: Person[] = [
  {id: 1, name: 'Ada', role: 'Engineer'},
  {id: 2, name: 'Grace', role: 'Admiral'},
]

const peopleColumns = [
  {key: 'name', header: 'Name', sortable: true},
  {key: 'role', header: 'Role'},
]

function Toasts() {
  const {toast} = useToast()
  return (
    <Button
      onClick={() => {
        toast({message: 'Saved', variant: 'success'})
        toast({message: 'Heads up', variant: 'info'})
        toast({message: 'Check your input', variant: 'warning'})
        toast({message: 'Something went wrong', variant: 'error'})
      }}
    >
      Notify
    </Button>
  )
}

/** Wait for Base UI's open transition, so axe sees the final DOM */
async function settled(role: string) {
  await waitFor(() => {
    const el = screen.getByRole(role)
    expect(el).not.toHaveAttribute('data-starting-style')
  })
}

const cases: Case[] = [
  // Layout
  {
    name: 'Stack, Group, Grid, Container, Separator',
    ui: (
      <Container size="md">
        <Stack gap="md">
          <Group justify="between">
            <span>One</span>
            <span>Two</span>
          </Group>
          <Separator />
          <Grid columns={12}>
            <GridCol span={6}>Left</GridCol>
            <GridCol span={6}>Right</GridCol>
          </Grid>
          <Group>
            <span>A</span>
            <Separator orientation="vertical" />
            <span>B</span>
          </Group>
        </Stack>
      </Container>
    ),
  },
  {name: 'Show', ui: <Show above="md">Desktop only</Show>},
  {
    name: 'AppShell with Sidebar and TopBar',
    ui: (
      <AppShell>
        <AppShellHeader>
          <TopBar>
            <TopBarSection>Logo</TopBarSection>
            <TopBarSection align="right">
              <Button variant="ghost">Sign out</Button>
            </TopBarSection>
          </TopBar>
        </AppShellHeader>
        <AppShellSidebar>
          <Sidebar aria-label="Main">
            <SidebarSection label="Workspace">
              <SidebarItem href="/" active>
                Home
              </SidebarItem>
              <SidebarItem href="/settings">Settings</SidebarItem>
              <SidebarItem disabled>Billing</SidebarItem>
            </SidebarSection>
          </Sidebar>
        </AppShellSidebar>
        <AppShellMain>
          <Heading level={1}>Dashboard</Heading>
        </AppShellMain>
        <AppShellFooter>Footer</AppShellFooter>
      </AppShell>
    ),
  },
  {
    name: 'Sidebar collapsed, with icons',
    ui: (
      <Sidebar collapsed aria-label="Main">
        <SidebarSection>
          <SidebarItem icon={<svg />} active>
            Home
          </SidebarItem>
          <SidebarItem icon={<svg />} href="/settings">
            Settings
          </SidebarItem>
        </SidebarSection>
      </Sidebar>
    ),
  },

  // Typography and display
  {
    name: 'Heading, Text',
    ui: (
      <div>
        <Heading level={1}>Title</Heading>
        <Heading level={2} size="lg">
          Subtitle
        </Heading>
        <Text color="muted" size="sm">
          Muted text
        </Text>
        <Text truncate>Truncated text</Text>
        <Text as="label" htmlFor="name">
          Name
        </Text>
        <input id="name" />
      </div>
    ),
  },
  {
    name: 'Button variants, sizes and disabled',
    ui: (
      <Group>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline" size="sm">
          Outline
        </Button>
        <Button variant="ghost" size="lg">
          Ghost
        </Button>
        <Button expanded>Expanded</Button>
        <Button disabled>Disabled</Button>
      </Group>
    ),
  },
  {
    name: 'Card variants',
    ui: (
      <Stack>
        {(['elevated', 'outlined', 'filled'] as const).map((variant) => (
          <Card key={variant} variant={variant}>
            <CardHeader>{variant}</CardHeader>
            <CardBody>Body</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        ))}
      </Stack>
    ),
  },
  {
    name: 'Badge and Tag variants, removable, with icon',
    ui: (
      <Group>
        <Badge>New</Badge>
        <Badge variant="error" size="sm">
          3
        </Badge>
        <Tag>Default</Tag>
        <Tag variant="success" icon={<svg />}>
          Done
        </Tag>
        <Tag removable onRemove={() => {}}>
          React
        </Tag>
      </Group>
    ),
  },
  {
    name: 'Avatar with image, fallback and no text',
    ui: (
      <Group>
        <Avatar src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="Ada Lovelace" />
        <Avatar fallback="AL" size="lg" />
        <Avatar />
      </Group>
    ),
  },
  {
    name: 'Stat with trends and icon',
    ui: (
      <Group>
        <Stat label="Revenue" value="$12,000" change="+12%" trend="up" />
        <Stat label="Churn" value="2%" change="-1%" trend="down" icon={<svg />} />
        <Stat label="Users" value={420} trend="neutral" />
      </Group>
    ),
  },
  {
    name: 'EmptyState with icon and action',
    ui: (
      <EmptyState
        icon={<svg />}
        title="No projects"
        description="Create one to get started."
        action={<Button>New project</Button>}
      />
    ),
  },
  {
    name: 'Table striped and responsive',
    ui: (
      <Table striped hoverable responsive aria-label="People">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Role</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
            <TableCell>Engineer</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  },
  {
    name: 'DataGrid sorted',
    ui: (
      <DataGrid
        aria-label="People"
        columns={peopleColumns}
        data={people}
        rowKey={(row) => row.id}
        defaultSort={{key: 'name', direction: 'desc'}}
        striped
      />
    ),
  },
  {
    name: 'PricingTable',
    ui: (
      <PricingTable>
        <PricingCard>
          <PricingCardHeader>Free</PricingCardHeader>
          <PricingCardPrice amount="$0" period="month" />
          <PricingCardFeatures>
            <PricingCardFeature>1 project</PricingCardFeature>
            <PricingCardFeature included={false}>Support</PricingCardFeature>
          </PricingCardFeatures>
          <PricingCardFooter>
            <Button>Choose</Button>
          </PricingCardFooter>
        </PricingCard>
        <PricingCard featured>
          <PricingCardHeader>Pro</PricingCardHeader>
          <PricingCardPrice amount="$10" period="month" />
          <PricingCardFeatures>
            <PricingCardFeature>Unlimited projects</PricingCardFeature>
          </PricingCardFeatures>
        </PricingCard>
      </PricingTable>
    ),
  },

  // Feedback
  {
    name: 'Alert variants and dismissible',
    ui: (
      <Stack>
        <Alert variant="info">Info</Alert>
        <Alert variant="success">Success</Alert>
        <Alert variant="warning">Warning</Alert>
        <Alert variant="error" dismissible onDismiss={() => {}}>
          Error
        </Alert>
      </Stack>
    ),
  },
  {
    name: 'Progress, Spinner, Skeleton',
    ui: (
      <Stack>
        <Progress value={40} aria-label="Upload" />
        <Progress value={80} variant="success" showLabel aria-label="Download" />
        <Progress value={0} max={0} aria-label="Empty" />
        <Spinner />
        <Spinner size="lg" label="Saving" />
        <Skeleton variant="text" />
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>
    ),
  },
  {
    name: 'Stepper horizontal and vertical',
    ui: (
      <Stack>
        <Stepper activeStep={1} aria-label="Checkout">
          <Step label="Cart" />
          <Step label="Shipping" description="Where to send it" />
          <Step label="Pay" />
        </Stepper>
        <Stepper activeStep={2} orientation="vertical" aria-label="Setup">
          <Step label="Account" />
          <Step label="Profile" />
          <Step label="Done" />
        </Stepper>
      </Stack>
    ),
  },
  {
    name: 'Toast, every variant',
    ui: (
      <ToastProvider>
        <Toasts />
      </ToastProvider>
    ),
    act: async (user) => {
      await user.click(screen.getByRole('button', {name: 'Notify'}))
      await screen.findAllByText('Something went wrong')
    },
  },

  // Navigation
  {
    name: 'Breadcrumbs, default and custom separator',
    ui: (
      <Stack>
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem active>Settings</BreadcrumbItem>
        </Breadcrumbs>
        <Breadcrumbs separator=">" aria-label="Docs breadcrumb">
          <BreadcrumbItem href="/">Docs</BreadcrumbItem>
          <BreadcrumbItem active>Install</BreadcrumbItem>
        </Breadcrumbs>
      </Stack>
    ),
  },
  {
    name: 'Pagination with ellipses',
    ui: <Pagination page={5} totalPages={20} onPageChange={() => {}} />,
  },
  {
    name: 'Tabs',
    ui: (
      <Tabs defaultValue="one">
        <TabsList aria-label="Sections">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
          <TabsTrigger value="three" disabled>
            Three
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one">First</TabsContent>
        <TabsContent value="two">Second</TabsContent>
        <TabsContent value="three">Third</TabsContent>
      </Tabs>
    ),
  },
  {
    name: 'Accordion, multiple with one open',
    ui: (
      <Accordion multiple defaultValue={['a']}>
        <AccordionItem value="a">
          <AccordionTrigger value="a">First</AccordionTrigger>
          <AccordionContent value="a">First content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger value="b">Second</AccordionTrigger>
          <AccordionContent value="b">Second content</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: 'ToggleGroup',
    ui: (
      <ToggleGroup defaultValue="grid" size="sm" aria-label="View">
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="table" disabled>
          Table
        </ToggleGroupItem>
      </ToggleGroup>
    ),
  },
  {
    name: 'Menu inline',
    ui: (
      <Menu aria-label="Account">
        <MenuLabel>Account</MenuLabel>
        <MenuItem>Profile</MenuItem>
        <MenuSeparator />
        <MenuItem variant="danger">Delete account</MenuItem>
      </Menu>
    ),
  },
  {
    name: 'Menu dropdown, open',
    ui: (
      <Menu trigger={<Button>Actions</Button>}>
        <MenuLabel>File</MenuLabel>
        <MenuItem>Rename</MenuItem>
        <MenuSeparator />
        <MenuItem variant="danger">Delete</MenuItem>
      </Menu>
    ),
    act: async (user) => {
      await user.click(screen.getByRole('button', {name: 'Actions'}))
      await settled('menu')
    },
  },

  // Overlays
  {
    name: 'Dialog open',
    ui: (
      <Dialog open onClose={() => {}}>
        <DialogHeader>Confirm</DialogHeader>
        <DialogBody>Are you sure?</DialogBody>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </Dialog>
    ),
    act: () => settled('dialog'),
  },
  {
    name: 'Dialog large, without footer',
    ui: (
      <Dialog open onClose={() => {}} size="lg">
        <DialogHeader>Details</DialogHeader>
        <DialogBody>
          <p>Lots of content.</p>
        </DialogBody>
      </Dialog>
    ),
    act: () => settled('dialog'),
  },
  {
    name: 'Drawer open, right',
    ui: (
      <Drawer open onClose={() => {}} aria-label="Filters">
        <Button>Apply</Button>
      </Drawer>
    ),
    act: () => settled('dialog'),
  },
  {
    name: 'Drawer open, left',
    ui: (
      <Drawer open onClose={() => {}} side="left" aria-label="Navigation">
        <a href="/">Home</a>
      </Drawer>
    ),
    act: () => settled('dialog'),
  },
  {
    name: 'Popover open',
    ui: (
      <Popover content={<p>Popover content</p>}>
        <Button variant="outline">Details</Button>
      </Popover>
    ),
    act: async (user) => {
      await user.click(screen.getByRole('button', {name: 'Details'}))
      await settled('dialog')
    },
  },
  {
    name: 'Tooltip open',
    ui: (
      <Tooltip content="Saves your changes" side="bottom">
        <Button>Save</Button>
      </Tooltip>
    ),
    act: async (user) => {
      await user.tab()
      await settled('tooltip')
    },
  },
  {
    name: 'CommandPalette open',
    ui: <CommandPalette open onClose={() => {}} items={commands} />,
    act: () => settled('dialog'),
  },
  {
    name: 'CommandPalette with no results',
    ui: <CommandPalette open onClose={() => {}} items={commands} />,
    act: async (user) => {
      await settled('dialog')
      await user.type(screen.getByRole('combobox'), 'zzz')
      await screen.findByText(/no results/i)
    },
  },

  // Forms
  {
    name: 'Field with description',
    ui: (
      <Field>
        <FieldLabel>Password</FieldLabel>
        <FieldDescription>At least 8 characters</FieldDescription>
        <Input type="password" />
      </Field>
    ),
  },
  {
    name: 'Input: error, disabled, required, sizes',
    ui: (
      <Stack>
        <Field error>
          <FieldLabel>Username</FieldLabel>
          <Input defaultValue="ab" />
          <FieldError>At least 3 characters</FieldError>
        </Field>
        <Field>
          <FieldLabel>Disabled</FieldLabel>
          <Input disabled />
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" required />
        </Field>
        <Input size="sm" aria-label="Small" />
        <Input size="lg" aria-label="Large" />
      </Stack>
    ),
  },
  {
    name: 'Textarea: default and error',
    ui: (
      <Stack>
        <Field>
          <FieldLabel>Message</FieldLabel>
          <Textarea />
        </Field>
        <Field error>
          <FieldLabel>Bio</FieldLabel>
          <Textarea />
          <FieldError>Bio is required</FieldError>
        </Field>
      </Stack>
    ),
  },
  {
    name: 'Select: placeholder, error, disabled',
    ui: (
      <Stack>
        <Field>
          <FieldLabel>Country</FieldLabel>
          <Select placeholder="Choose a country">
            <option value="us">United States</option>
            <option value="ca">Canada</option>
          </Select>
        </Field>
        <Field error>
          <FieldLabel>Region</FieldLabel>
          <Select>
            <option>North</option>
          </Select>
          <FieldError>Pick a region</FieldError>
        </Field>
        <Select disabled aria-label="Disabled">
          <option>Off</option>
        </Select>
      </Stack>
    ),
  },
  {
    name: 'Checkbox and Switch: checked, disabled, in an error Field',
    ui: (
      <Stack>
        <Checkbox label="Accept terms" />
        <Checkbox label="Subscribed" defaultChecked />
        <Checkbox label="Locked" disabled />
        <Switch label="Notifications" />
        <Switch label="Dark mode" defaultChecked size="lg" />
        <Switch label="Beta" disabled />
        <Field error>
          <Checkbox label="I agree" />
          <FieldError>You must agree</FieldError>
        </Field>
      </Stack>
    ),
  },
  {
    name: 'RadioGroup with a selection and a disabled radio',
    ui: (
      <RadioGroup legend="Plan" defaultValue="pro" name="plan">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
        <Radio value="team" label="Team" disabled />
      </RadioGroup>
    ),
  },
  {
    name: 'Slider and NumberInput',
    ui: (
      <Stack>
        <Field>
          <FieldLabel>Volume</FieldLabel>
          <Slider defaultValue={50} showValue />
        </Field>
        <Field>
          <FieldLabel>Quantity</FieldLabel>
          <NumberInput min={0} max={10} defaultValue={2} />
        </Field>
        <Field>
          <FieldLabel>Seats</FieldLabel>
          <NumberInput disabled />
        </Field>
      </Stack>
    ),
  },
  {
    name: 'DatePicker and TimePicker: range and error',
    ui: (
      <Stack>
        <Field>
          <FieldLabel>Booking date</FieldLabel>
          <DatePicker min="2024-01-01" max="2024-12-31" />
        </Field>
        <Field error>
          <FieldLabel>Start date</FieldLabel>
          <DatePicker />
          <FieldError>Required</FieldError>
        </Field>
        <Field>
          <FieldLabel>Start time</FieldLabel>
          <TimePicker />
        </Field>
      </Stack>
    ),
  },
  {
    name: 'Combobox with a value, and in an error Field',
    ui: (
      <Stack>
        <Field>
          <FieldLabel>Framework</FieldLabel>
          <Combobox options={options} defaultValue="vue" />
        </Field>
        <Field error>
          <FieldLabel>Fallback</FieldLabel>
          <Combobox options={options} placeholder="Search..." />
          <FieldError>Required</FieldError>
        </Field>
      </Stack>
    ),
  },
  {
    name: 'Combobox open',
    ui: (
      <Field>
        <FieldLabel>Framework</FieldLabel>
        <Combobox options={options} placeholder="Search..." />
      </Field>
    ),
    act: async (user) => {
      await user.click(screen.getByRole('combobox'))
      await user.keyboard('{ArrowDown}')
      await settled('listbox')
    },
  },
  {
    name: 'MultiSelect with values, and disabled',
    ui: (
      <Stack>
        <Field>
          <FieldLabel>Skills</FieldLabel>
          <MultiSelect options={options} defaultValue={['react', 'vue']} />
        </Field>
        <Field>
          <FieldLabel>Locked</FieldLabel>
          <MultiSelect options={options} disabled />
        </Field>
      </Stack>
    ),
  },
  {
    name: 'MultiSelect open',
    ui: (
      <Field>
        <FieldLabel>Skills</FieldLabel>
        <MultiSelect options={options} defaultValue={['react']} placeholder="Add skills..." />
      </Field>
    ),
    act: async (user) => {
      await user.click(screen.getByRole('combobox'))
      await user.keyboard('{ArrowDown}')
      await settled('listbox')
    },
  },
  {
    name: 'FileUpload: default and disabled',
    ui: (
      <Stack>
        <FileUpload accept="image/*" multiple />
        <FileUpload disabled />
      </Stack>
    ),
  },
]

describe('axe: every component and state', () => {
  it.each(cases)('$name', async ({ui, act: setup}) => {
    const user = userEvent.setup()
    render(ui)
    if (setup) await setup(user)
    // Base UI may update after mount (e.g. once it has measured the DOM)
    const results = await act(() => axe(document.body))
    expect(results).toHaveNoViolations()
  })
})
