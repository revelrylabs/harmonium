# Harmonium Roadmap

This document tracks planned features and improvements beyond the current component library. Items are ordered by impact and grouped into phases.

---

## Phase 1: Documentation & Discoverability

The single highest-impact gap. Developers can't adopt what they can't explore.

### Deployed docs site
- [x] Deploy Storybook to a public URL (GitHub Pages)
- [x] Custom landing page with install instructions, feature comparison, and quick start
- [x] Searchable component API reference
- [x] Copy-paste code examples for every component and variant

### Recipes & patterns
- [x] "Recipes" section showing common real-world UI patterns:
  - Login / signup form
  - Settings page
  - Dashboard layout with sidebar
  - Data table with filters and pagination
  - Marketing landing page
  - Pricing page
- [x] Each recipe should be a self-contained, copy-pasteable code block

### Framework integration guides
- [ ] Next.js (App Router + Pages Router)
- [ ] Remix
- [ ] Vite + React
- [ ] Astro

---

## Phase 2: Responsive Design System

Tailwind's breakpoint system is a key reason developers choose it. Harmonium needs a first-class responsive story.

### Responsive props on layout components
- [x] Support object syntax for responsive values: `<Stack direction={{base: 'vertical', md: 'horizontal'}}>`
- [x] Apply to `Stack`, `Group`, `Grid`, `GridCol`, `Container`
- [x] Define standard breakpoint tokens (`sm`, `md`, `lg`, `xl`) in the design token system

### Responsive visibility components
- [x] `<Show above="md">` — render children only above a breakpoint
- [x] `<Show below="sm">` — hide children below a breakpoint (using `below` prop)
- [x] CSS-only implementation (no JS resize observers)

### Exported breakpoint tokens
- [x] Export breakpoint values as CSS custom properties (`--harmonium-screen-sm`, etc.)
- [x] Export as TypeScript constants for consumers who need them in JS

---

## Phase 3: Starter Templates

Lower the barrier from "I installed it" to "I have a working app."

### Free starter templates
- [ ] **Dashboard** — sidebar nav, header, main content area, stats cards
- [ ] **Marketing / landing page** — hero, features grid, pricing, CTA
- [ ] **SaaS app shell** — auth pages, settings, data tables, empty states
- [ ] **Admin panel** — CRUD views, form pages, data grid

### Template format
- [ ] Each template is a standalone Vite + React project with Harmonium pre-configured
- [ ] Available via `npx create-harmonium-app --template dashboard` or similar
- [ ] Also available as copy-paste from the docs site

---

## Phase 4: Utility Layer for One-Off Styling

Cover the 20% of UI that isn't a pre-built component, without forcing developers into raw CSS.

### Utility components
- [ ] `Box` — generic container with style props for spacing, color, border, display
- [ ] `Flex` — shorthand for flexbox layouts outside of `Stack`/`Group`
- [ ] `Center` — center content horizontally and vertically
- [ ] All utility components should use design tokens, not arbitrary values

### Utility CSS classes (optional, opt-in import)
- [ ] Small set of token-aware utility classes for spacing (`hm-p-md`, `hm-m-lg`)
- [ ] Evaluate whether this is worth maintaining vs. just shipping utility components
- [ ] If included, keep it under 2 KB gzipped and make it a separate import (`harmonium/utilities.css`)

---

## Phase 5: Richer Default Design Tokens

Expand the default palette and token set so fewer projects need custom tokens on day one.

### Color palette depth
- [ ] Expand each color to a full shade scale (50–950) similar to Tailwind / Open Color
- [ ] Semantic aliases for common use cases (`color-text-muted`, `color-bg-subtle`, etc.)
- [ ] Ensure dark mode tokens cover the full scale

### Animation & transition tokens
- [ ] Duration tokens (`--harmonium-duration-fast`, `--harmonium-duration-normal`, `--harmonium-duration-slow`)
- [ ] Easing tokens (`--harmonium-ease-in`, `--harmonium-ease-out`, `--harmonium-ease-in-out`)
- [ ] Pre-built animation keyframes (`--harmonium-animation-spin`, `--harmonium-animation-fade-in`)
- [ ] Transition utility classes or a `<Transition>` component

### Shadow & elevation tokens
- [ ] Expanded shadow scale (`shadow-xs` through `shadow-2xl`)
- [ ] Elevation system mapping shadows to semantic levels (`elevation-card`, `elevation-dialog`)

---

## Phase 6: Editor Tooling

### VS Code extension
- [ ] Inline color swatches for `--harmonium-color-*` tokens
- [ ] Autocomplete for CSS custom property names
- [ ] Component prop documentation on hover (beyond what TypeScript provides)
- [ ] Snippet library for common patterns

---

## Phase 7: Ecosystem & Community

### Package ecosystem
- [ ] `@harmonium/icons` — icon set designed for Harmonium's visual style
- [ ] `@harmonium/charts` — chart components using the token system
- [ ] `@harmonium/forms` — higher-level form library with validation (React Hook Form / Zod integration)

### Community
- [ ] Contribution guide
- [ ] Component request / RFC process
- [ ] Showcase of projects built with Harmonium
- [ ] Discord or GitHub Discussions

---

## Non-Goals

Things we've explicitly decided not to pursue:

- **Tailwind plugin** — Harmonium's value is not needing Tailwind. Adding a Tailwind integration would undermine the positioning and add maintenance burden.
- **CSS-in-JS runtime** — zero-runtime styling is a core differentiator. We will not add Emotion, styled-components, or similar.
- **Unstyled/headless mode** — Base UI already serves this niche. Harmonium's value is being opinionated and styled out of the box.
