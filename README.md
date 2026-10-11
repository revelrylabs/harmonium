# Harmonium

[![Bundle size, all components (gzip)](https://img.shields.io/badge/all_components_%28gzip%29-125.3_KB_JS_%2B_12.3_KB_CSS-blue)](#bundle-size)

**Ship products, not utility classes.**

A complete design system out of the box. Install, import, and build — no assembling primitives, no configuring class utilities, no copy-pasting component source code.

## Install

```bash
npm install harmonium@next
```

Harmonium 9 is a ground-up rewrite and is currently in pre-release under the `next` tag. `npm install harmonium` still installs v8 until 9.0.0 is stable.

**Using v8?** It stays in maintenance on the [`8.x` branch](https://github.com/revelrylabs/harmonium/tree/8.x) (`npm install harmonium@8`). See [MIGRATION.md](https://github.com/revelrylabs/harmonium/blob/main/MIGRATION.md) to upgrade.

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

### Importing one component

Every component is its own module, so importing from `harmonium` only pulls in the components you use. Each one also has its own entry point, `harmonium/<component>` in kebab-case:

```tsx
import {Button} from 'harmonium/button'
import {ToggleGroup, ToggleGroupItem} from 'harmonium/toggle-group'
import {Table, TableRow, TableCell} from 'harmonium/table'
import 'harmonium/styles.css' // still required once
```

Sub-components come from their parent's entry (`CardBody` from `harmonium/card`). Two exceptions: `Text` and `Heading` come from `harmonium/typography`, and `ToastProvider` and `useToast` from `harmonium/toast`. CSS ships as one stylesheet for all components, so import `harmonium/styles.css` (or `harmonium/styles.layer.css`) either way.

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

Dark mode: components only use semantic color tokens (`surface-*`, `text-*`, `border`), never the raw gray scale, so overriding the semantic set is enough. Put `data-theme="dark"` on `<html>` (or any wrapper) and add:

<!-- generated:dark-mode -->
```css
[data-theme="dark"] {
  color-scheme: dark; /* native controls, scrollbars and date/time pickers */
  --harmonium-color-bg: #141414;
  --harmonium-color-surface: #1c1c1c;
  --harmonium-color-surface-raised: #262626;  /* menus, popovers, dialogs, drawers */
  --harmonium-color-surface-muted: #232323;   /* filled cards, striped rows */
  --harmonium-color-surface-hover: #313131;
  --harmonium-color-surface-active: #3b3b3b;
  --harmonium-color-surface-neutral: #333333; /* neutral badges/tags, skeletons, tracks */
  --harmonium-color-surface-strong: #4a4a4a;  /* switch/slider tracks, spinner ring */
  --harmonium-color-surface-inverse: #ececec; /* tooltips, info toasts */
  --harmonium-color-text: #ececec;
  --harmonium-color-text-muted: #a3a3a3;
  --harmonium-color-text-placeholder: #909090;
  --harmonium-color-text-inverse: #1a1a1a;
  --harmonium-color-border: #4f4f4f;
  --harmonium-color-disabled: #5c5c5c;
}
```
<!-- /generated:dark-mode -->

Set your page background from the tokens too (`body { background: var(--harmonium-color-bg); color: var(--harmonium-color-text); }`). To follow the OS setting instead, put the same declarations in `@media (prefers-color-scheme: dark) { [data-theme="auto"] { … } }` and use `data-theme="auto"`. Brand and status colors aren't changed by this block; if you use `brand-primary` as text on dark surfaces, a lighter brand shade reads better.

### Overriding component styles

Variant styles use `[data-variant]` / `[data-size]` selectors, so a single custom class doesn't beat them in `harmonium/styles.css`. To make your own CSS always win, import the layered stylesheet instead. It's the same CSS inside `@layer harmonium`, and any CSS outside that layer takes precedence:

```tsx
import 'harmonium/styles.layer.css' // instead of 'harmonium/styles.css'
```

```tsx
<Button className="checkout-button">Pay</Button>
```

```css
.checkout-button { background: #0a7d32; } /* wins over the primary variant */
```

## Comparison

| Feature | Harmonium | MUI | Chakra UI | Mantine | shadcn/ui | Radix Themes |
|---------|-----------|-----|-----------|---------|-----------|--------------|
| **JS for one Button (gzip)** | 0.5 KB | 37.6 KB | 61.3 KB (with `ChakraProvider`) | 15.1 KB (with `MantineProvider`) | Varies (you own source) | 23.6 KB (with `Theme`) |
| **JS for all components (gzip)** | 125.3 KB (14.9 KB Harmonium + Base UI) | 164.5 KB | 307.6 KB | 187.8 KB | Varies (you own source) | 83.2 KB |
| **CSS (gzip)** | 12.3 KB | Generated at runtime | Generated at runtime | 40.0 KB | Tailwind output | 83.4 KB |
| **Components** | 50 | 60+ | 50+ | 60+ | ~40 (copy-paste) | ~30 |
| **Install & use** | `npm install`, import | `npm install`, import | `npm install`, import | `npm install`, import | CLI copies source into your repo | `npm install`, import |
| **Styling approach** | CSS Modules (zero runtime) | Emotion (JS runtime) | Emotion (JS runtime) | Static CSS (zero runtime) | Tailwind utility classes | Static CSS (zero runtime) |
| **Theming** | Plain CSS custom properties | JS theme object + `ThemeProvider` | JS theme object + `ChakraProvider` | JS theme object + `MantineProvider` | `tailwind.config.js` | Proprietary token system |
| **Provider wrapper required** | No | Yes | Yes | Yes | No | Yes (`Theme`) |
| **Build plugin required** | No | No | No | No | Yes (PostCSS/Tailwind) | No |
| **RSC compatible** | Yes (`'use client'` components) | Partial | No | Partial | Yes | Partial |
| **Design tokens** | W3C DTCG standard | Proprietary | Proprietary | Proprietary | None (Tailwind config) | Proprietary |
| **Accessibility** | WCAG 2.1 AA (Base UI) | WCAG 2.1 AA | WCAG 2.1 AA | WCAG 2.1 AA | Depends on implementation | WCAG 2.1 AA (Radix) |
| **TypeScript** | Strict, typed enum props | Yes | Yes | Yes | Yes | Yes |
| **LLM context files** | `llms.txt`, `CLAUDE.md`, `AGENTS.md` | No | No | No | No | No |
| **Centrally maintained** | Yes (`npm update`) | Yes | Yes | Yes | No (you own the source) | Yes |
| **Visual design out of the box** | Yes | Yes (Material) | Yes | Yes | No (unstyled) | Yes |

Sizes measured 2026-10-11: Harmonium 9.0.0-alpha.2, MUI 9.5.0, Chakra UI 3.37.0, Mantine 9.7.2, Radix Themes 3.3.0. "One Button" includes the provider a library needs to render it. See [Bundle size](#bundle-size) for how they're measured.

## Bundle size

Every number here is measured, not estimated. CI measures Harmonium on every pull request and fails if a size goes over its budget (`packages/harmonium/scripts/check-size.ts`).

| What your app imports | JS (gzip) | CSS (gzip) |
|---|--:|--:|
| `Button` | 0.5 KB | 12.3 KB, all components |
| `Dialog` | 23.4 KB | |
| Every component | 125.3 KB (14.9 KB is Harmonium, the rest is Base UI) | |

How: each case is a one-line app (`export {Button} from 'harmonium'`) bundled with esbuild the way a production build would bundle it: through the package's `exports` and `sideEffects`, tree-shaken, minified, `NODE_ENV=production`, with React left out because your app already has it. Dependencies such as Base UI are included, because your app ships them. The stylesheet is measured as published. Sizes are gzip level 9.

The comparison table measures MUI, Chakra UI, Mantine and Radix Themes the same way, with `pnpm --filter harmonium run size:competitors`. shadcn/ui isn't measured: it copies source into your app, so its size depends on what you copy. MUI and Chakra UI generate their CSS at runtime; their JS sizes include the Emotion runtime that does it.

## Components

<!-- generated:components -->
52 components across 11 categories:

| Category | Components |
|----------|------------|
| **Layout** | Stack, Group, Grid, Separator, Container, AppShell, Sidebar, Show |
| **Typography** | Text, Heading |
| **Forms** | Field, Input, Textarea, Select, Checkbox, Radio, Switch, Slider, NumberInput, Combobox, DatePicker, TimePicker, FileUpload, MultiSelect |
| **Actions** | Button, ToggleGroup |
| **Display** | Card, Badge, Alert, Progress, Spinner, Avatar, Skeleton, Tag, EmptyState, Stat |
| **Navigation** | Tabs, Accordion, Breadcrumbs, Pagination, TopBar |
| **Data** | Table, DataGrid |
| **Overlays** | Dialog, Drawer, Tooltip, Popover, Menu, CommandPalette |
| **Feedback** | ToastProvider, useToast |
| **Wizard** | Stepper |
| **Marketing** | PricingTable |
<!-- /generated:components -->

Many components include compound sub-components (e.g., `Card` exports `CardHeader`, `CardBody`, `CardFooter`).

**Explore the full API:**
- **[Storybook](https://revelrylabs.github.io/harmonium/)** — interactive docs with live examples
- **[`llms.txt`](https://revelrylabs.github.io/harmonium/llms.txt) / [`llms-full.txt`](https://revelrylabs.github.io/harmonium/llms-full.txt)** — structured API references for AI tools
- **TypeScript autocomplete** — all props are fully typed with JSDoc descriptions

## Component Patterns

All components follow consistent patterns:

- **`forwardRef`** — attach refs to any component
- **`data-*` attributes** for variants — inspectable in DevTools, styleable by consumers
- **`className` prop** always merged last; use `harmonium/styles.layer.css` when your CSS should always win (see [Overriding component styles](#overriding-component-styles))
- **Enum props** (`variant`, `size`) instead of boolean prop soup
- **Controlled + uncontrolled** — components support both patterns where applicable

## LLM-Friendly

Harmonium is designed for AI-assisted development. Typed enum props, consistent component patterns, and `data-*` attribute styling mean LLMs generate correct code on the first try — no string-based class guessing.

- **[`llms.txt`](https://revelrylabs.github.io/harmonium/llms.txt)** and **[`llms-full.txt`](https://revelrylabs.github.io/harmonium/llms-full.txt)** — structured API references that AI tools can ingest for complete library knowledge. `llms-full.txt` also ships in the npm package (`node_modules/harmonium/llms-full.txt`), so it always matches the installed version.
- **`AGENTS.md`** — shipped in the npm package at `node_modules/harmonium/AGENTS.md`; point your AI coding assistant at it (e.g. reference it from your project's own `AGENTS.md` or `CLAUDE.md`)
- All three are generated from the components' TypeScript types and JSDoc, and CI fails if they fall out of date.
- **Typed props** — `variant="primary"` not `className="btn-primary"`, so autocomplete and AI tools always know valid values

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) 10+

### Monorepo Structure

The repo uses pnpm workspaces + Turborepo with three packages:

| Package | Path | Description |
|---------|------|-------------|
| `harmonium` | `packages/harmonium/` | Published library (`harmonium` on npm) |
| `@harmonium/docs` | `packages/docs/` | Storybook documentation (private) |
| `@harmonium/playground` | `packages/playground/` | Vite dev playground for manual testing (private) |

### Commands

```bash
pnpm install                    # Install dependencies
pnpm build                      # Build tokens + library (all packages)
pnpm test                       # Run tests (Vitest)
pnpm lint                       # ESLint
pnpm clean                      # Remove dist/ output
```

### Storybook

Storybook provides interactive documentation and a visual testbed for all components. Stories live in `packages/docs/stories/`.

```bash
pnpm storybook                  # Launch Storybook on http://localhost:6006
```

### Playground

The playground is a minimal Vite + React app that consumes `harmonium` from the workspace. Use it for quick manual testing of components during development.

```bash
pnpm --filter playground dev    # Launch playground dev server
```

### Additional Commands

```bash
# Build tokens only (after editing design-tokens/*.json)
pnpm --filter harmonium run tokens

# Run a single test file
pnpm --filter harmonium exec vitest run src/components/Button/Button.test.tsx

# Run tests in watch mode
pnpm --filter harmonium run test:watch
```

### Adding a New Component

1. Create `packages/harmonium/src/components/ComponentName/` with:
   - `ComponentName.tsx` — component with `forwardRef`, TypeScript props interface
   - `ComponentName.module.css` — CSS Modules with CSS Custom Properties for theming
   - `ComponentName.test.tsx` — Vitest + React Testing Library tests
   - `index.ts` — re-export
2. Export from `packages/harmonium/src/components/index.ts`
3. Export from `packages/harmonium/src/index.ts`
4. Add a Storybook story in `packages/docs/stories/ComponentName.stories.tsx`

### Design Tokens

Tokens use the W3C DTCG format and live in `design-tokens/`. The build pipeline:

```
design-tokens/*.json → Style Dictionary 4 → packages/harmonium/src/tokens/tokens.css
```

All generated CSS variables are prefixed with `--harmonium-`. After editing tokens, run `pnpm --filter harmonium run tokens`.

## Tech Stack

- TypeScript (strict)
- React 18+
- CSS Modules + CSS Custom Properties
- Design tokens: W3C DTCG format + Style Dictionary 4
- Build: tsup (ESM + CJS)
- Test: Vitest + React Testing Library
- Docs: Storybook 8
- Monorepo: pnpm + Turborepo

## License

MIT — [Revelry Labs](https://revelry.co)
