# Harmonium

The component library for teams that ship products, not design systems.

Real npm packages. Design-token theming. Semantic markup. Accessible by default.

## Install

```bash
npm install harmonium
```

## Usage

```tsx
import {Button, Card, CardBody, Input, Field, FieldLabel} from 'harmonium'
import 'harmonium/styles.css'

function App() {
  return (
    <Card>
      <CardBody>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="you@example.com" />
        </Field>
        <Button variant="primary">Submit</Button>
      </CardBody>
    </Card>
  )
}
```

## Theming

Override design tokens with plain CSS — no build tools required:

```css
:root {
  --harmonium-color-brand-primary: #E91E63;
  --harmonium-color-brand-secondary: #9C27B0;
  --harmonium-radius-md: 8px;
  --harmonium-font-family-sans: 'Inter', sans-serif;
}
```

Dark mode:

```css
[data-theme="dark"] {
  --harmonium-color-bg: #1a1a1a;
  --harmonium-color-text: #f0f0f0;
  --harmonium-color-surface: #2d2d2d;
  --harmonium-color-border: #404040;
}
```

## Components

### Layout
Stack, Group, Grid, GridCol, Separator

### Forms
Field (Label, Description, Error), Input, Textarea, Select, Checkbox, Radio, RadioGroup, Switch, NumberInput, Slider, Combobox, MultiSelect, DatePicker, TimePicker

### Display
Card (Header, Body, Footer), Badge, Alert, Progress, Spinner, Avatar, Skeleton

### Navigation
Tabs (List, Trigger, Content), Accordion (Item, Trigger, Content), Breadcrumbs, Pagination, TopBar

### Data
Table (Head, Body, Row, Header, Cell), DataGrid

### Overlays
Dialog (Header, Body, Footer), Drawer, Tooltip, Popover, Menu (Item, Separator, Label), CommandPalette

### Feedback
Toast (Provider + useToast hook)

### Wizard
Stepper, Step

### Actions
Button

## Component Patterns

All components follow consistent patterns:

- **`forwardRef`** — attach refs to any component
- **`data-*` attributes** for variants — inspectable in DevTools, styleable by consumers
- **`className` prop** always merged last — easy to override styles
- **Enum props** (`variant`, `size`) instead of boolean prop soup
- **Controlled + uncontrolled** — components support both patterns where applicable

## Development

```bash
pnpm install          # Install dependencies
pnpm build            # Build tokens + library
pnpm test             # Run tests (Vitest)
pnpm storybook        # Launch Storybook (port 6006)
pnpm lint             # ESLint
```

## Tech Stack

- TypeScript (strict)
- React 18+
- CSS Modules + CSS Custom Properties
- Design tokens: W3C DTCG format + Style Dictionary 4
- Build: tsup (ESM + CJS)
- Test: Vitest + React Testing Library
- Docs: Storybook
- Monorepo: pnpm + Turborepo

## License

MIT — [Revelry Labs](https://revelry.co)
