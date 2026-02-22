# Harmonium v2 — Product Requirements Document

## Context

Harmonium is a React component library by Revelry Labs (v8.0.3). Its core philosophy — design-token-driven theming, semantic class names, opinionated defaults — directly addresses the most vocal criticisms of Tailwind CSS and shadcn/ui. However, the implementation is outdated (class components, Enzyme, jQuery, SCSS-only, no TypeScript, React 15+). This PRD defines a ground-up rebuild that preserves the design philosophy while delivering a modern, competitive library.

**Positioning**: "Ship products, not utility classes." A complete design system out of the box — install, import, and build. No assembling primitives, no configuring class utilities, no copy-pasting component source code. Design-token theming. Semantic markup. Accessible by default. LLM-friendly — typed enum props and consistent patterns mean AI tools generate correct code without hallucinating APIs.

---

## Tech Stack

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Language | TypeScript (strict) | Non-negotiable for 2026 component libraries |
| React | 18+ (19-compatible) | Required by Base UI, enables RSC compatibility |
| Headless primitives | Base UI (`@base-ui-components/react`) | v1.0 stable (Dec 2025), full-time MUI team, cleanest API |
| Styling | CSS Modules + CSS Custom Properties | Zero runtime, RSC-compatible, proven by Mantine v7 at scale |
| Design tokens | Style Dictionary 4 + W3C DTCG format | Natural upgrade from existing SD3, W3C spec now stable |
| Build | tsup (dual ESM/CJS, `.d.ts` generation) | ~15 lines config, fast, clear path to tsdown when 1.0 |
| Testing | Vitest 4 + React Testing Library + Playwright | Unified runner, browser mode stable, built-in visual regression |
| Docs | Storybook 10 | Industry standard, ESM-only rewrite, massive addon ecosystem |
| Monorepo | pnpm + Turborepo | Single published package, private docs/playground packages |
| CI/CD | GitHub Actions + semantic-release | Preserve existing release automation |

---

## Package Structure

```
harmonium/
├── packages/
│   ├── harmonium/                # Published package: "harmonium"
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.module.css
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Dialog/
│   │   │   │   ├── ...
│   │   │   │   └── index.ts       # Barrel export
│   │   │   ├── hooks/             # Shared hooks (useControllable, useId, etc.)
│   │   │   ├── tokens/            # Generated token types + CSS
│   │   │   ├── utils/             # Internal utilities (classnames helper, etc.)
│   │   │   └── index.ts           # Package entry point
│   │   ├── tsup.config.ts
│   │   └── package.json
│   ├── docs/                      # Storybook (private, not published)
│   │   ├── .storybook/
│   │   └── stories/
│   └── playground/                # Dev playground (private)
├── design-tokens/                 # W3C DTCG format JSON files
│   ├── color.json
│   ├── spacing.json
│   ├── typography.json
│   └── ...
├── turbo.json
├── pnpm-workspace.yaml
└── package.json                   # Root workspace config
```

**Consumer install:**
```bash
npm install harmonium
```

**Consumer usage:**
```tsx
import { Button, Dialog, Input } from 'harmonium'
import 'harmonium/styles.css'
```

**package.json exports:**
```json
{
  "exports": {
    ".": { "import": "./dist/index.mjs", "require": "./dist/index.cjs", "types": "./dist/index.d.ts" },
    "./styles.css": "./dist/styles.css",
    "./tokens.css": "./dist/tokens.css"
  },
  "sideEffects": ["*.css"],
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

---

## Design Token System

### Token Format (W3C DTCG)

Migrate from current custom JSON to the W3C Design Tokens specification:

```json
{
  "color": {
    "brand": {
      "primary": {
        "$type": "color",
        "$value": "#295DE5",
        "$description": "Primary brand color"
      }
    },
    "ui": {
      "success": { "$type": "color", "$value": "#4CAF50" },
      "warning": { "$type": "color", "$value": "#FF9800" },
      "error": { "$type": "color", "$value": "#F44336" }
    }
  },
  "spacing": {
    "xs": { "$type": "dimension", "$value": "4px" },
    "sm": { "$type": "dimension", "$value": "8px" },
    "md": { "$type": "dimension", "$value": "16px" },
    "lg": { "$type": "dimension", "$value": "24px" },
    "xl": { "$type": "dimension", "$value": "32px" }
  }
}
```

### Token Pipeline

```
design-tokens/*.json (W3C DTCG)
  → Style Dictionary 4
    → tokens.css        (CSS Custom Properties for consumers)
    → tokens.ts         (TypeScript constants for programmatic access)
    → tokens.json       (Machine-readable for tooling)
```

### Consumer Theming

Consumers override tokens via CSS — no build step, no SCSS, no JavaScript:

```css
/* my-theme.css */
:root {
  --harmonium-color-brand-primary: #E91E63;
  --harmonium-color-brand-secondary: #9C27B0;
  --harmonium-radius-md: 8px;
  --harmonium-font-family-base: 'Inter', sans-serif;
}
```

Dark mode via media query or class:

```css
[data-theme="dark"] {
  --harmonium-color-bg: #1a1a1a;
  --harmonium-color-text: #f0f0f0;
  --harmonium-color-surface: #2d2d2d;
}
```

---

## Component Styling Pattern

Each component uses CSS Modules with CSS Custom Properties for theming:

```css
/* Button.module.css */
.root {
  display: inline-flex;
  align-items: center;
  gap: var(--harmonium-spacing-xs);
  padding: var(--harmonium-spacing-sm) var(--harmonium-spacing-md);
  font-size: var(--harmonium-font-size-base);
  font-weight: var(--harmonium-font-weight-medium);
  border-radius: var(--harmonium-radius-md);
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease, box-shadow 0.15s ease;
}

/* Variants via data attributes */
.root[data-variant="primary"] {
  background: var(--harmonium-color-brand-primary);
  color: var(--harmonium-color-on-primary);
}

.root[data-variant="outline"] {
  background: transparent;
  border: 1px solid var(--harmonium-color-border);
  color: var(--harmonium-color-text);
}

.root[data-size="sm"] {
  padding: var(--harmonium-spacing-xs) var(--harmonium-spacing-sm);
  font-size: var(--harmonium-font-size-sm);
}

.root:disabled {
  opacity: var(--harmonium-opacity-disabled);
  cursor: not-allowed;
}
```

```tsx
// Button.tsx
import * as React from 'react'
import styles from './Button.module.css'
import { clsx } from 'clsx'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(styles.root, className)}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
      </button>
    )
  }
)
```

**Key patterns:**
- `data-*` attributes for variants (inspectable in DevTools, styleable by consumers)
- `clsx` instead of `classnames` (smaller, faster)
- `forwardRef` on all components
- Consumer `className` always merged last (override-friendly)
- No boolean prop soup — use `variant` and `size` enums

---

## Component Inventory

### Phase 1: Core (v2.0) — Ship a usable library

Build these on Base UI primitives where available:

| Component | Base UI Primitive | Notes |
|-----------|------------------|-------|
| **Button** | `<Button>` | Variants: primary, secondary, outline, ghost. Sizes: sm, md, lg |
| **Input** | `<Input>` | With `Input.Root`, `Input.Label`, `Input.Description`, `Input.Error` |
| **Textarea** | — | Same field pattern as Input |
| **Select** | `<Select>` | Native-like with custom styling |
| **Checkbox** | `<Checkbox>` | With label integration |
| **Radio** | `<RadioGroup>` | Group with label integration |
| **Switch** | `<Switch>` | Toggle switch (new — not in v1) |
| **Dialog** | `<Dialog>` | Replaces Modal. Accessible focus trap, portal |
| **Drawer** | `<Dialog>` + CSS | Slide-in panel using Dialog primitive |
| **Tabs** | `<Tabs>` | Keyboard navigation, ARIA |
| **Accordion** | `<Accordion>` | Single/multi expand modes |
| **Menu** | `<Menu>` | Dropdown and context menus |
| **Tooltip** | `<Tooltip>` | Hover/focus with portal |
| **Popover** | `<Popover>` | Click-triggered floating content |
| **Card** | — | Card, Card.Header, Card.Body, Card.Footer |
| **Badge** | — | Variants: primary, success, warning, error |
| **Alert** | `<Alert>` | Replaces Callout. Dismissible, variants |
| **Table** | — | Semantic table with responsive stacking |
| **Progress** | `<Progress>` | Determinate and indeterminate |
| **Spinner** | — | Replaces Loader. CSS animation, no JS |
| **Stack** | — | Vertical/horizontal flex layout (new) |
| **Group** | — | Horizontal flex with gap (new) |
| **Grid** | — | CSS Grid-based layout replacing Row/Col (new) |
| **Separator** | `<Separator>` | Horizontal/vertical divider (new) |

**24 components** — enough to build real applications.

### Phase 2: Extended (v2.1)

| Component | Notes |
|-----------|-------|
| **DatePicker** | Port from v1 with Temporal API or date-fns |
| **TimePicker** | Port from v1 |
| **Combobox** | Base UI Combobox — autocomplete/typeahead |
| **NumberInput** | `<NumberField>` from Base UI |
| **Slider** | `<Slider>` from Base UI |
| **Pagination** | Port from v1 |
| **Breadcrumbs** | Port from v1 |
| **TopBar** | Navigation header |
| **Avatar** | User avatar with fallback (new) |
| **Skeleton** | Loading placeholder (new) |
| **Toast** | Notification system (new) |

### Phase 3: Advanced (v2.2+)

| Component | Notes |
|-----------|-------|
| **DataGrid** | Sortable, filterable table |
| **FileUpload** | Drag-and-drop, progress, validation |
| **MultiSelect** | Tag-based multi-selection |
| **CommandPalette** | Command-K style search |
| **Stepper** | Multi-step wizard |

### Not Porting from v1

| Component | Reason |
|-----------|--------|
| Tokenizer | jQuery dependency, niche. Replaced by Combobox |
| ChartBuilder | Thin chart.js wrapper — consumers can use chart.js directly |
| Social | URL generator, not a UI component |
| BrowserSupportWarning | bowser dependency, outdated concept |
| AuthenticityToken | Rails-specific concern, not a general UI component |
| I18n | Thin wrapper around i18n-js, not value-add |
| Currency/NumberFormatter | Thin Intl wrappers, not UI components |
| Pluralize | Utility, not a UI component |
| FlexVideo | Solved by `aspect-ratio` CSS property |
| Brand | Too application-specific |
| Lipsum | Development utility only |

---

## Developer Experience

### Style Overrides

Three levels of customization, from simple to advanced:

**1. Token overrides** (most common): Change colors, spacing, fonts globally

```css
:root {
  --harmonium-color-brand-primary: #E91E63;
}
```

**2. Component class overrides**: Style specific component parts

```tsx
<Button className="my-custom-button">Click me</Button>
```

```css
.my-custom-button {
  border-radius: 9999px;
  text-transform: uppercase;
}
```

**3. Unstyled mode**: Use components with no Harmonium CSS, bring your own styles

```tsx
import { Button } from 'harmonium/unstyled'  // Just behavior + ARIA, no CSS
```

### TypeScript

Full type coverage:
- All props typed with JSDoc descriptions
- Discriminated unions for variant props
- Generic components where appropriate (e.g., `Select<T>`)
- Exported types for all component props

### Accessibility

- All interactive components meet WCAG 2.1 AA
- Inherited from Base UI primitives (focus management, ARIA attributes, keyboard navigation)
- Vitest-axe tests for every component
- Storybook a11y addon in docs

---

## Implementation Phases

### Phase 0: Scaffold (Week 1-2)

- [ ] Initialize pnpm + Turborepo monorepo
- [ ] Set up TypeScript config (strict mode)
- [ ] Configure tsup for dual ESM/CJS build
- [ ] Set up Vitest 4 with React Testing Library
- [ ] Set up Storybook 10
- [ ] Migrate design tokens to W3C DTCG format
- [ ] Configure Style Dictionary 4 to output CSS Custom Properties + TypeScript
- [ ] Create `tokens.css` with all CSS Custom Properties
- [ ] Set up CI (GitHub Actions): build, test, lint
- [ ] ESLint flat config + Prettier

### Phase 1: Core Components (Weeks 3-8)

- [ ] Build foundational layout: Stack, Group, Grid, Separator
- [ ] Build Button + ButtonGroup
- [ ] Build form components: Input, Textarea, Select, Checkbox, Radio, Switch
- [ ] Build field wrappers: Field.Root, Field.Label, Field.Description, Field.Error
- [ ] Build Card (Header, Body, Footer)
- [ ] Build Dialog (replaces Modal) + Drawer
- [ ] Build Tabs + Accordion
- [ ] Build Menu + Tooltip + Popover
- [ ] Build Table (responsive stacking)
- [ ] Build Badge, Alert, Progress, Spinner
- [ ] Write Storybook stories for all components
- [ ] Write tests for all components (unit + a11y)
- [ ] **v2.0.0-beta.1 release**

### Phase 2: Extended Components (Weeks 9-12)

- [ ] DatePicker, TimePicker
- [ ] Combobox, NumberInput, Slider
- [ ] Pagination, Breadcrumbs, TopBar
- [ ] Avatar, Skeleton, Toast
- [ ] **v2.0.0 stable release**

### Phase 3: Polish & Ecosystem (Weeks 13+)

- [ ] Documentation website (Storybook-based, deployed)
- [ ] Figma token sync (Tokens Studio integration)
- [ ] Visual regression test suite (Playwright screenshots)
- [ ] Migration guide from Harmonium v1
- [ ] DataGrid, FileUpload, MultiSelect (v2.1+)

---

## Verification

### Build Verification
```bash
pnpm build                    # Produces dist/ with .mjs, .cjs, .d.ts, .css
pnpm test                     # Vitest unit + a11y tests pass
pnpm storybook                # All stories render correctly
pnpm lint                     # ESLint + Prettier pass
```

### Consumer Verification
```bash
# In a fresh Create React App or Vite project:
npm install harmonium
# Import a component, import styles.css, verify it renders
# Override a CSS custom property, verify theming works
# Verify tree-shaking: unused components not in bundle
```

### Size Budget
- Core CSS (tokens + base styles): < 10KB gzipped
- Button component JS: < 2KB gzipped
- Full library JS (all components): < 50KB gzipped

---

## Success Criteria

1. **Consumer installs with one command**, imports components, and has a working styled UI
2. **Theming requires only CSS** — no Sass compiler, no JavaScript config, no build plugin
3. **Every component is accessible** out of the box (WCAG 2.1 AA, keyboard navigable)
4. **Bundle size is competitive** with Radix Themes / Mantine
5. **TypeScript autocomplete** surfaces all props, variants, and token values
6. **Semantic markup** — inspecting the DOM shows meaningful class names and data attributes, not utility class soup
7. **LLM-friendly** — AI coding tools generate correct Harmonium code using shipped `llms-full.txt`, `CLAUDE.md`, and `AGENTS.md` context files
