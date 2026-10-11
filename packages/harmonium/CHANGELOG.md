# harmonium

## 9.0.0-alpha.2

### Patch Changes

- 3997fd4: - `harmonium/styles.css` now includes the design tokens. Before, importing it alone (as the docs say) rendered components mostly unstyled.
  - Every JS file in the package starts with `'use client'`, so Harmonium can be imported from React Server Components (e.g. the Next.js App Router).
  - New `harmonium/styles.layer.css`: the same CSS inside `@layer harmonium`, for apps whose own CSS (e.g. a `className`) must always override Harmonium's variant styles.
  - CommandPalette: arrow keys and Enter follow the on-screen order when groups are interleaved.
  - Accordion: `onValueChange` fires once per click under React StrictMode.

## 9.0.0-alpha.1

### Major Changes

- 002ceaa: Harmonium 9 is a ground-up rewrite: TypeScript, CSS Modules with design tokens, and Base UI primitives. Every component has a new API. See MIGRATION.md for upgrading from v8.
