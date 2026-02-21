# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Harmonium v2 is a TypeScript React component library built on Base UI headless primitives with CSS Modules + CSS Custom Properties for styling. Design tokens (W3C DTCG format) are the single source of truth, processed by Style Dictionary 4 into CSS variables. See `PRD.md` for full product requirements.

## Commands

All commands run from the repo root unless noted:

- **Install**: `pnpm install`
- **Build all**: `pnpm build` (tokens + tsup)
- **Build tokens only**: `pnpm --filter harmonium run tokens`
- **Test**: `pnpm test` (Vitest)
- **Single test file**: `pnpm --filter harmonium exec vitest run src/components/Button/Button.test.tsx`
- **Test watch**: `pnpm --filter harmonium run test:watch`
- **Lint**: `pnpm lint`
- **Storybook**: `pnpm storybook` (port 6006)

## Architecture

### Monorepo Structure

pnpm workspaces + Turborepo. Three packages:
- `packages/harmonium/` — published package (`harmonium` on npm)
- `packages/docs/` — Storybook documentation (private)
- `packages/playground/` — dev playground (private)

### Component Pattern

Each component lives in `packages/harmonium/src/components/ComponentName/`:
- `ComponentName.tsx` — component with `forwardRef`, TypeScript props interface
- `ComponentName.module.css` — CSS Modules with CSS Custom Properties for theming
- `ComponentName.test.tsx` — Vitest + React Testing Library tests
- `index.ts` — re-export

Key conventions:
- **`data-*` attributes for variants** (e.g., `data-variant="primary"`, `data-size="sm"`) — inspectable in DevTools, styleable by consumers
- **`clsx`** for class composition (not `classnames`)
- **Consumer `className` merged last** for easy overrides
- **Enum props** (`variant`, `size`) instead of boolean prop soup

### Design Tokens

W3C DTCG format JSON in `design-tokens/`. Build pipeline:
```
design-tokens/*.json → Style Dictionary 4 → packages/harmonium/src/tokens/tokens.css
```
All CSS variables prefixed `--harmonium-`. After editing tokens, run `pnpm --filter harmonium run tokens`.

### Styling

CSS Modules scoped per component, themed via CSS Custom Properties. Consumers override tokens with plain CSS:
```css
:root { --harmonium-color-brand-primary: #E91E63; }
```

## Adding a New Component

1. Create `packages/harmonium/src/components/ComponentName/` with `ComponentName.tsx`, `ComponentName.module.css`, `ComponentName.test.tsx`, `index.ts`
2. Export from `packages/harmonium/src/components/index.ts`
3. Export from `packages/harmonium/src/index.ts`
4. Add Storybook story in `packages/docs/stories/ComponentName.stories.tsx`

## Code Style

- Prettier: single quotes, no semicolons, trailing commas (all), no bracket spacing
- ESLint 9 flat config with TypeScript strict, React, React Hooks
- Vitest with `@testing-library/react` and `@testing-library/user-event`
