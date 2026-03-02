# Harmonium

**Ship products, not utility classes.**

A complete design system out of the box. Install, import, and build — no assembling primitives, no configuring class utilities, no copy-pasting component source code.

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

## Comparison

| Feature | Harmonium | MUI | Chakra UI | Mantine | shadcn/ui | Radix Themes |
|---------|-----------|-----|-----------|---------|-----------|--------------|
| **JS size (gzip)** | ~12 KB | ~80 KB+ | ~45 KB+ | ~35 KB+ | Varies (you own source) | ~30 KB+ |
| **CSS size (gzip)** | ~8 KB | Generated at runtime | Generated at runtime | Generated at runtime | Tailwind output | ~15 KB+ |
| **Components** | 50 | 60+ | 50+ | 60+ | ~40 (copy-paste) | ~30 |
| **Install & use** | `npm install`, import | `npm install`, import | `npm install`, import | `npm install`, import | CLI copies source into your repo | `npm install`, import |
| **Styling approach** | CSS Modules (zero runtime) | Emotion (JS runtime) | Emotion (JS runtime) | CSS-in-JS runtime | Tailwind utility classes | Runtime CSS-in-JS |
| **Theming** | Plain CSS custom properties | JS theme object + `ThemeProvider` | JS theme object + `ChakraProvider` | JS theme object + `MantineProvider` | `tailwind.config.js` | Proprietary token system |
| **Provider wrapper required** | No | Yes | Yes | Yes | No | No |
| **Build plugin required** | No | No | No | No | Yes (PostCSS/Tailwind) | No |
| **RSC compatible** | Yes | Partial | No | Partial | Yes | Partial |
| **Design tokens** | W3C DTCG standard | Proprietary | Proprietary | Proprietary | None (Tailwind config) | Proprietary |
| **Accessibility** | WCAG 2.1 AA (Base UI) | WCAG 2.1 AA | WCAG 2.1 AA | WCAG 2.1 AA | Depends on implementation | WCAG 2.1 AA (Radix) |
| **TypeScript** | Strict, typed enum props | Yes | Yes | Yes | Yes | Yes |
| **LLM context files** | `llms.txt`, `CLAUDE.md`, `AGENTS.md` | No | No | No | No | No |
| **Centrally maintained** | Yes (`npm update`) | Yes | Yes | Yes | No (you own the source) | Yes |
| **Visual design out of the box** | Yes | Yes (Material) | Yes | Yes | No (unstyled) | Yes |

## Components

50 components across 10 categories:

| Category | Components |
|----------|------------|
| **Layout** | Stack, Group, Grid, Container, Separator, AppShell, Sidebar |
| **Typography** | Text, Heading |
| **Forms** | Field, Input, Textarea, Select, Checkbox, Radio, Switch, NumberInput, Slider, Combobox, MultiSelect, DatePicker, TimePicker, FileUpload |
| **Actions** | Button, ToggleGroup |
| **Display** | Card, Badge, Tag, Alert, Progress, Spinner, Avatar, Skeleton, Stat, EmptyState |
| **Navigation** | Tabs, Accordion, Breadcrumbs, Pagination, TopBar |
| **Data** | Table, DataGrid |
| **Overlays** | Dialog, Drawer, Tooltip, Popover, Menu, CommandPalette |
| **Feedback** | Toast (Provider + useToast hook) |
| **Wizard** | Stepper |
| **Marketing** | PricingTable |

Many components include compound sub-components (e.g., `Card` exports `CardHeader`, `CardBody`, `CardFooter`).

**Explore the full API:**
- **[Storybook](http://localhost:6006)** — run `pnpm storybook` for interactive docs with live examples
- **`llms.txt` / `llms-full.txt`** — structured API references for AI tools
- **TypeScript autocomplete** — all props are fully typed with JSDoc descriptions

## Component Patterns

All components follow consistent patterns:

- **`forwardRef`** — attach refs to any component
- **`data-*` attributes** for variants — inspectable in DevTools, styleable by consumers
- **`className` prop** always merged last — easy to override styles
- **Enum props** (`variant`, `size`) instead of boolean prop soup
- **Controlled + uncontrolled** — components support both patterns where applicable

## LLM-Friendly

Harmonium is designed for AI-assisted development. Typed enum props, consistent component patterns, and `data-*` attribute styling mean LLMs generate correct code on the first try — no string-based class guessing.

- **`llms.txt`** and **`llms-full.txt`** — structured API references that AI tools can ingest for complete library knowledge
- **`CLAUDE.md`** / **`AGENTS.md`** — shipped in the npm package so AI coding assistants in your project automatically understand Harmonium's API
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
