## Setup

Harmonium 9 is in pre-release under the `next` tag; `npm install harmonium` still installs v8.

```bash
npm install harmonium@next
```

```tsx
import {Button, Card, CardBody, Input} from 'harmonium'
import 'harmonium/styles.css' // required, once, in your app entry
```

Importing from `harmonium` only pulls in the components you use. Each component also has its own entry, `harmonium/<kebab-case-name>`: `import {Button} from 'harmonium/button'`, `import {ToggleGroup} from 'harmonium/toggle-group'`. Sub-components come from their parent's entry (`CardBody` from `harmonium/card`). Two exceptions: `Text` and `Heading` come from `harmonium/typography`, and `ToastProvider` and `useToast` from `harmonium/toast`. `harmonium/Button` (PascalCase) does not exist. Import `harmonium/styles.css` either way.

Components are marked `'use client'`, so they can be imported from React Server Components.

## Conventions

- Every component forwards its `ref` and accepts the HTML attributes of the element it renders.
- Variants are enum props (`variant`, `size`), not boolean props, and render as `data-*` attributes (`data-variant="primary"`) you can inspect and style.
- `className` is merged last. Variant rules (`[data-variant]`, `[data-size]`) out-rank a single class in `harmonium/styles.css`; import `harmonium/styles.layer.css` instead when your CSS must always win.
- Components support both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) use where it applies.
- Props you pass add to a component's behaviour instead of replacing it. Your event handlers (`onClick`, `onKeyDown`, ...) run first, then the component's own; call `event.preventBaseUIHandler()` in yours to skip the component's handling. `className` and `style` are merged.

## Forms: the Field pattern

`Field` wires its label, description and error to the control inside it (`id`, `htmlFor`, `aria-describedby`, `aria-errormessage`):

```tsx
<Field error={!!errors.email}>
  <FieldLabel>Email</FieldLabel>
  <FieldDescription>We won't share this.</FieldDescription>
  <Input type="email" placeholder="you@example.com" />
  <FieldError>{errors.email}</FieldError>
</Field>
```

Field-aware controls: Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, NumberInput, DatePicker, TimePicker, Combobox, MultiSelect. If you pass the control an `id`, `FieldLabel` points at it. An `aria-describedby` you pass is merged with the Field's. Custom controls can wire themselves up with `useFieldContext()`.

## Theming

Override CSS custom properties; no build step:

```css
:root {
  --harmonium-color-brand-primary: #E91E63;
  --harmonium-color-brand-secondary: #9C27B0;
  --harmonium-radius-md: 8px;
  --harmonium-font-family-sans: 'Inter', sans-serif;
}
```

Dark mode: components only use semantic color tokens, so overriding them is enough. Put `data-theme="dark"` on `<html>` (or any wrapper) and add:

{{dark-mode}}

## Without React

`harmonium/harmonium.css` is the same styles as global `hm-*` classes, for plain HTML, Phoenix, Rails or any other stack. Variants use the same `data-*` attributes. `llms-full.txt` lists each component's classes.

```html
<link rel="stylesheet" href="node_modules/harmonium/dist/harmonium.css">

<button class="hm-button" data-variant="primary">Save</button>
<div class="hm-card"><div class="hm-card-body">Content</div></div>
```

Interactive components (dialogs, menus, comboboxes, tabs) need your own JavaScript for their behaviour in plain HTML.
