---
'harmonium': patch
---

The LLM docs are generated from the source, so they match the installed version.

- `llms.txt`, `llms-full.txt` and `AGENTS.md` are built from the components' TypeScript types and JSDoc (`pnpm docs:llms`), and CI fails when they are out of date. They now cover every export, including AppShell, Sidebar, Container, Text/Heading, Tag, EmptyState, ToggleGroup, Stat, PricingTable, Show, `breakpoints` and `useFieldContext`, with each prop's type and default, the `harmonium/<component>` import, and the plain-HTML `hm-*` classes and `data-*` attributes.
- The npm package now ships `llms.txt`, `llms-full.txt` and `components.json` (the same data as JSON), so agents can read `node_modules/harmonium/llms-full.txt` offline. The package `CLAUDE.md` now points at `AGENTS.md` instead of duplicating it.
- `llms.txt` and `llms-full.txt` are served from the docs site (https://revelrylabs.github.io/harmonium/llms.txt), and the links in them, and the README's Storybook link, point there instead of a 404 and `localhost`.
- Every exported component has a JSDoc description, and the main component of each family an `@example`, enforced by a lint rule. Corrected docs: `Group`'s `grow` makes every item share the row (it doesn't grow the group), and `Progress`'s `value` runs from 0 to `max`, not 0 to 100.
- The README and Storybook component lists include `Show`: 52 components across 11 categories.
