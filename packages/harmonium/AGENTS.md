# Harmonium — AI Context

This file helps AI coding assistants (Claude, Cursor, Copilot, Codex) generate correct Harmonium code. If you're an LLM, read this before writing any Harmonium code.

## Setup

```tsx
import { Button, Card, CardBody, Input } from 'harmonium'
import 'harmonium/styles.css' // Required — include once in your app entry
```

## Conventions

- All components use `forwardRef` and accept standard HTML attributes
- Variants use enum props (`variant`, `size`), not boolean props
- Variants render as `data-*` attributes (e.g. `data-variant="primary"`)
- `className` is always merged last — you can override any style
- Use `clsx` for conditional classes (not `classnames`)

## Theming

Override CSS custom properties — no build step required:

```css
:root {
  --harmonium-color-brand-primary: #E91E63;
  --harmonium-color-brand-secondary: #9C27B0;
  --harmonium-radius-md: 8px;
  --harmonium-font-family-sans: 'Inter', sans-serif;
}
```

Dark mode via `[data-theme="dark"]` selector on a parent element.

## Component Quick Reference

### Button
`<Button variant="primary|secondary|outline|ghost" size="sm|md|lg" expanded>`

### Layout
- `<Stack direction="vertical|horizontal" gap="xs|sm|md|lg|xl" align="start|center|end|stretch" justify="start|center|end|between|around" wrap>`
- `<Group gap align justify wrap grow>` — horizontal flex
- `<Grid columns={12} gap="md"><GridCol span={6}>...</GridCol></Grid>`
- `<Separator orientation="horizontal|vertical" spacing="xs|sm|md|lg|xl" />`

### Card
```tsx
<Card variant="elevated|outlined|filled" padding="none|sm|md|lg">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Forms — Field Pattern
Field auto-wires accessibility (id, htmlFor, aria-describedby, aria-errormessage) to child controls:

```tsx
<Field error={!!errors.email}>
  <FieldLabel>Email</FieldLabel>
  <FieldDescription>We won't share this.</FieldDescription>
  <Input type="email" placeholder="you@example.com" />
  <FieldError>{errors.email}</FieldError>
</Field>
```

Field-aware controls: Input, Textarea, Select, NumberInput, DatePicker, TimePicker.

### Form Controls
- `<Input size="sm|md|lg">` — extends `<input>`
- `<Textarea>` — extends `<textarea>`
- `<Select size="sm|md|lg" placeholder="..."><option>...</option></Select>`
- `<Checkbox label="..." />`
- `<RadioGroup legend="..."><Radio label="..." value="..." /></RadioGroup>`
- `<Switch label="..." size="sm|md|lg" />`
- `<NumberInput min max step size="sm|md|lg" value={n} onChange={(n) => {}} />`
- `<Slider min max size="sm|md|lg" showValue />`
- `<DatePicker size="sm|md|lg" />` — renders `<input type="date">`
- `<TimePicker size="sm|md|lg" />` — renders `<input type="time">`
- `<Combobox options={[{value, label}]} value={v} onChange={setV} placeholder="..." />`
- `<MultiSelect options={[{value, label}]} value={[]} onChange={setValues} />`
- `<FileUpload accept="image/*" multiple maxSize={5000000} onChange={(files) => {}} />`

### Data Display
- `<Badge variant="primary|secondary|success|warning|error|neutral" size="sm|md|lg">`
- `<Alert variant="info|success|warning|error" dismissible onDismiss={fn}>`
- `<Progress value={75} max={100} variant="primary|..." size="sm|md|lg" showLabel />`
- `<Spinner size="sm|md|lg" label="Loading" />`
- `<Avatar src="..." alt="..." fallback="JD" size="sm|md|lg|xl" />`
- `<Skeleton variant="text|circular|rectangular" width={w} height={h} />`

### Table
```tsx
<Table striped hoverable responsive>
  <TableHead><TableRow><TableHeader>Name</TableHeader></TableRow></TableHead>
  <TableBody><TableRow><TableCell>Jane</TableCell></TableRow></TableBody>
</Table>
```

### DataGrid
```tsx
<DataGrid
  columns={[{ key: 'name', header: 'Name', sortable: true, render: (row) => row.name }]}
  data={items}
  rowKey={(row) => row.id}
  sort={sort}
  onSortChange={setSort}
  striped hoverable
/>
```

### Navigation
```tsx
// Tabs (controlled or uncontrolled)
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>

// Accordion (single or multiple)
<Accordion defaultValue="item1" multiple>
  <AccordionItem value="item1">
    <AccordionTrigger value="item1">Section 1</AccordionTrigger>
    <AccordionContent value="item1">Content</AccordionContent>
  </AccordionItem>
</Accordion>

// Breadcrumbs
<Breadcrumbs separator="/">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem active>Current</BreadcrumbItem>
</Breadcrumbs>

// Pagination
<Pagination page={1} totalPages={10} onPageChange={setPage} maxVisible={5} />

// TopBar
<TopBar fixed>
  <TopBarSection align="left">Logo</TopBarSection>
  <TopBarSection align="right">Nav</TopBarSection>
</TopBar>
```

### Overlays
```tsx
// Dialog
<Dialog open={isOpen} onClose={close} size="sm|md|lg|full">
  <DialogHeader>Title</DialogHeader>
  <DialogBody>Content</DialogBody>
  <DialogFooter>Actions</DialogFooter>
</Dialog>

// Drawer
<Drawer open={isOpen} onClose={close} side="left|right" size="sm|md|lg">
  Content
</Drawer>

// Tooltip — wraps children, shows on hover/focus
<Tooltip content="Help text" side="top|bottom|left|right">
  <Button>Hover me</Button>
</Tooltip>

// Popover — wraps children, opens on click
<Popover content={<div>Popover content</div>} side="top|bottom|left|right">
  <Button>Click me</Button>
</Popover>

// Menu
<Menu>
  <MenuLabel>Group</MenuLabel>
  <MenuItem onClick={fn}>Action</MenuItem>
  <MenuSeparator />
  <MenuItem variant="danger" onClick={fn}>Delete</MenuItem>
</Menu>

// CommandPalette
<CommandPalette
  open={isOpen}
  onClose={close}
  items={[{ id: '1', label: 'Action', group: 'Group', onSelect: fn }]}
/>
```

### Toast
```tsx
// Wrap app in provider
<ToastProvider position="bottom-right"><App /></ToastProvider>

// Use hook in any component
const { toast, dismiss } = useToast()
toast({ message: 'Saved!', variant: 'success', duration: 5000 })
```

### Stepper
```tsx
<Stepper activeStep={1} orientation="horizontal|vertical">
  <Step label="Step 1" description="First step" />
  <Step label="Step 2" description="Second step" />
</Stepper>
```

## Common Patterns

**Form with validation:**
```tsx
<Stack gap="md">
  <Field error={!!errors.name}>
    <FieldLabel>Name</FieldLabel>
    <Input value={name} onChange={e => setName(e.target.value)} />
    <FieldError>{errors.name}</FieldError>
  </Field>
  <Group justify="end" gap="sm">
    <Button variant="outline" onClick={onCancel}>Cancel</Button>
    <Button onClick={onSubmit}>Save</Button>
  </Group>
</Stack>
```

**Page layout:**
```tsx
<Stack gap="lg">
  <TopBar>
    <TopBarSection align="left"><strong>App</strong></TopBarSection>
    <TopBarSection align="right"><Avatar src={user.photo} size="sm" /></TopBarSection>
  </TopBar>
  <Grid columns={12} gap="md">
    <GridCol span={3}>{/* Sidebar */}</GridCol>
    <GridCol span={9}>{/* Main content */}</GridCol>
  </Grid>
</Stack>
```
