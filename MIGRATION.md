# Migrating from Harmonium v1 to v2

## Breaking Changes

Harmonium v2 is a ground-up rewrite. Every component has a new API.

### Installation

```diff
- npm install harmonium
- # Then set up SCSS imports, Sass compiler, etc.

+ npm install harmonium
+ # Import CSS — no Sass required
+ import 'harmonium/styles.css'
```

### Imports

```diff
- import {Button, Row, Col, Modal} from 'harmonium/lib/...'
+ import {Button, Grid, GridCol, Dialog} from 'harmonium'
```

### Styling

```diff
- // SCSS variables with !default
- $color-brand-primary: #295DE5;
- @import 'harmonium/scss/app';

+ /* CSS Custom Properties — no build step */
+ :root {
+   --harmonium-color-brand-primary: #295DE5;
+ }
```

## Component Mapping

| v1 Component | v2 Component | Notes |
|---|---|---|
| `Button` | `Button` | Use `variant` prop instead of `primary`/`secondary`/`alert` booleans |
| `Row` / `Col` | `Grid` / `GridCol` | CSS Grid based. Use `columns` and `span` props |
| `Modal` / `StatelessModal` | `Dialog` | Sections: `DialogHeader`, `DialogBody`, `DialogFooter` |
| `Drawer` / `StatelessDrawer` | `Drawer` | Use `side` prop instead of `left`/`right` booleans |
| `Tabs` / `Tabs.Stateful` | `Tabs` | Compound: `TabsList`, `TabsTrigger`, `TabsContent` |
| `Accordion` / `Accordion.Stateful` | `Accordion` | Compound: `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| `Input` / `Input.Stack` | `Field` + `Input` | Wrap with `Field`, `FieldLabel`, `FieldError` |
| `Textarea` / `Textarea.Stack` | `Field` + `Textarea` | Same Field wrapper pattern |
| `Select` / `Select.Stack` | `Field` + `Select` | Same Field wrapper pattern |
| `Checkbox` / `Checkbox.Fieldset` | `Checkbox` | Label built in via `label` prop |
| `Radio` / `Radio.Fieldset` | `RadioGroup` + `Radio` | Use `RadioGroup` with `legend` prop |
| `Table` | `Table` | Sub-components: `TableHead`, `TableBody`, `TableRow`, `TableHeader`, `TableCell` |
| `DataGrid` | `DataGrid` | New generic API with `columns`, `data`, `rowKey` |
| `Badge` | `Badge` | Use `variant` prop instead of `primary`/`success`/etc. booleans |
| `Callout` | `Alert` | Use `variant` prop (`info`/`success`/`warning`/`error`) |
| `Progress` | `Progress` | Use `variant` prop instead of boolean style props |
| `Loader` | `Spinner` | CSS-only animation, no JS |
| `Breadcrumbs` | `Breadcrumbs` + `BreadcrumbItem` | Use `active` prop on current item |
| `Pagination` | `Pagination` | Controlled: `page`, `totalPages`, `onPageChange` |
| `TopBar` | `TopBar` + `TopBarSection` | Use `align` prop on sections |
| `Menu` | `Menu` + `MenuItem` | Add `MenuSeparator`, `MenuLabel` |
| `InputGroup` | `Group` + `Input` + `Button` | Use layout components to compose |
| `MediaObject` | `Group` | Use flex layout components |
| `Visibility` | CSS / media queries | Use CSS directly instead of wrapper component |
| `TextAlign` | CSS | Apply `text-align` via className or style |
| `Icon` | Bring your own | Use any icon library directly |
| `Slider` | `Slider` | Styled range input with `showValue` option |
| `DatePicker` | `DatePicker` | Styled native `<input type="date">` |
| `TimePicker` | `TimePicker` | Styled native `<input type="time">` |
| `Tokenizer` | `Combobox` or `MultiSelect` | `Combobox` for single, `MultiSelect` for multiple |
| `MediaUploader` | `FileUpload` | Drag-and-drop with `maxSize` validation |

## Removed Components

These v1 components are not in v2:

| Component | Reason | Alternative |
|---|---|---|
| `ChartBuilder` | Thin chart.js wrapper | Use chart.js directly |
| `Social` | URL generator, not UI | Build URLs in app code |
| `BrowserSupportWarning` | Outdated concept | Modern browsers don't need this |
| `AuthenticityToken` | Rails-specific | Handle CSRF in your app |
| `I18n` | Thin i18n-js wrapper | Use i18n library directly |
| `Currency` / `NumberFormatter` | Thin Intl wrappers | Use `Intl.NumberFormat` |
| `Pluralize` | Utility function | Use i18n library or write a helper |
| `FlexVideo` | Solved by CSS | Use `aspect-ratio` CSS property |
| `Brand` | Too app-specific | Build your own brand component |
| `Lipsum` | Dev utility | Use a lorem ipsum package |
| `Emptyable` | Simple conditional | Use ternary in JSX |
| `ExpandingCol` | Niche layout | Use CSS or Accordion |
| `Sticky` | Niche utility | Use `position: sticky` CSS |
| `Form` | Rails-specific | Use `<form>` element directly |

## New in v2

Components that didn't exist in v1:

- **Switch** — Toggle switch input
- **Stack** / **Group** — Flex layout primitives
- **Grid** / **GridCol** — CSS Grid layout
- **Separator** — Horizontal/vertical divider
- **Tooltip** — Hover/focus tooltip
- **Popover** — Click-triggered floating content
- **Toast** — Notification system with `useToast` hook
- **Avatar** — User avatar with image fallback
- **Skeleton** — Loading placeholder
- **NumberInput** — Input with increment/decrement buttons
- **Combobox** — Autocomplete/typeahead input
- **MultiSelect** — Tag-based multi-selection
- **CommandPalette** — Command+K search interface
- **Stepper** — Multi-step wizard
- **FileUpload** — Drag-and-drop file upload

## Key Pattern Changes

### Boolean props → Enum props

```diff
- <Button primary large>Click</Button>
+ <Button variant="primary" size="lg">Click</Button>
```

### CSS class names → data attributes

```diff
- // v1: .rev-Button--primary
+ // v2: [data-variant="primary"]
```

### SCSS variables → CSS Custom Properties

```diff
- $button-bkgd: $color-brand-primary;
+ --harmonium-color-brand-primary: #295DE5;
```

### Class components → Function components with hooks

All components are function components with `forwardRef`.
