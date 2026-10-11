# Contributing and Development

Harmonium 9 lives on `main`; v8 fixes go to the `8.x` branch (see [Releasing](#releasing)).

## Setup

You need [Node.js](https://nodejs.org/) 18+ and [pnpm](https://pnpm.io/) 10+.

```bash
pnpm install
pnpm build        # design tokens + the harmonium package (tsup)
pnpm storybook    # docs on http://localhost:6006
```

The repo is a pnpm workspace run with Turborepo:

| Package | Path | What it is |
|---------|------|------------|
| `harmonium` | `packages/harmonium/` | The published React library |
| `@harmonium/docs` | `packages/docs/` | Storybook docs, deployed to https://revelrylabs.github.io/harmonium/ |
| `@harmonium/playground` | `packages/playground/` | A Vite app for trying components by hand |
| `harmonium_ex` | `packages/harmonium_ex/` | Phoenix components for the plain-HTML stylesheet (Hex package) |

## Commands

Run from the repo root:

| Command | What it does |
|---------|--------------|
| `pnpm build` | Build tokens and every package |
| `pnpm --filter harmonium run tokens` | Rebuild only the design tokens |
| `pnpm test` | Run the Vitest suite |
| `pnpm --filter harmonium exec vitest run src/components/Button/Button.test.tsx` | Run one test file |
| `pnpm --filter harmonium run test:watch` | Tests in watch mode |
| `pnpm lint` | ESLint, including the `require-docs` rule |
| `pnpm size` | Check bundle sizes against their budgets (after `pnpm build`) |
| `pnpm docs:llms` | Regenerate the LLM docs and component lists; `--check` fails if they're stale |
| `pnpm storybook` | Storybook on port 6006 |
| `pnpm changeset` | Describe your change for the changelog |

CI runs build, `pnpm size`, the tests, `pnpm docs:llms --check` and lint on every pull request.

## Adding or changing a component

Each component lives in `packages/harmonium/src/components/ComponentName/`:

- `ComponentName.tsx`: the component, with `forwardRef` and an exported `ComponentNameProps` interface
- `ComponentName.module.css`: its styles, as a CSS Module themed with `--harmonium-*` custom properties
- `ComponentName.test.tsx`: Vitest + React Testing Library tests
- `index.ts`: re-exports

Then export it from `packages/harmonium/src/components/index.ts` and `packages/harmonium/src/index.ts`, and add a story in `packages/docs/stories/ComponentName.stories.tsx`. The build gives every folder its own `harmonium/<kebab-name>` entry automatically.

Conventions:

- Variants are enum props (`variant`, `size`) rendered as `data-*` attributes (`data-variant="primary"`), and CSS targets those attributes.
- Compose classes with `clsx`, and merge the consumer's `className` last.
- Build interactive behaviour on [Base UI](https://base-ui.com/) primitives rather than hand-rolling focus and keyboard handling. Merge consumer props with Base UI's `mergeProps`, so consumer handlers run first and can call `event.preventBaseUIHandler()`.
- Style only with semantic color tokens (`surface-*`, `text-*`, `border`), never the raw gray scale, so dark mode keeps working.
- Code style is Prettier (single quotes, no semicolons, trailing commas, no bracket spacing) and ESLint.

### JSDoc and the generated docs

`llms.txt`, `llms-full.txt`, `packages/harmonium/AGENTS.md`, `packages/harmonium/components.json`, the component tables in `README.md` and `Introduction.mdx`, and the dark-mode block in both are generated from the source by `packages/harmonium/scripts/generate-llm-docs.ts`. Don't edit them by hand: change the JSDoc (or the prose in `packages/harmonium/scripts/llm-docs/`), then run `pnpm docs:llms` and commit the result.

The `harmonium/require-docs` lint rule (`packages/harmonium/eslint-rules/require-docs.js`) requires:

- a JSDoc description on every exported component;
- on the component a file is named after (`Card` in `Card.tsx`), an `@example` and a `@category` (one of the categories in `generate-llm-docs.ts`);
- a description on every member of an exported interface or object type, unless it's marked `@internal`.

Use `@default` on a prop when its default isn't set in the component's parameter list.

### Testing

Write tests with Vitest, `@testing-library/react` and `@testing-library/user-event` next to the component. Cover keyboard use and consumer props (a consumer `onClick` or `id` must add to the component's behaviour, not replace it). See [Accessibility tests and coverage](#accessibility-tests-and-coverage) for the shared axe and keyboard suites.

## Design tokens

Tokens are W3C DTCG JSON files in `design-tokens/`. Style Dictionary turns them into `--harmonium-*` CSS custom properties in `packages/harmonium/src/tokens/tokens.css` (generated, not committed). After editing a token, run `pnpm --filter harmonium run tokens` (or `pnpm build`).

## The plain-HTML stylesheet

The build also writes `dist/harmonium.css`: the same styles as global `hm-*` classes (`.root` in `Card.module.css` becomes `.hm-card`, `.header` becomes `.hm-card-header`). `packages/harmonium_ex/priv/static/harmonium.css` is a committed copy that CI checks against the build, so commit it whenever component CSS changes. If you change a component's markup, update the matching `harmonium_ex` component too.

## Submitting changes

1. Branch from `main` (or `8.x` for a v8 fix).
2. Make your change with tests, and run `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm size` and `pnpm docs:llms --check`.
3. Run `pnpm changeset` and describe the change for users.
4. Open a pull request against `main`.

## Accessibility tests and coverage

- `packages/harmonium/src/a11y.test.tsx` runs axe on every exported component in each state that changes its markup or ARIA (open overlays, Field error and disabled states, variants). Add a case when you add a component or a state.
- `packages/harmonium/src/keyboard.test.tsx` covers keyboard support that a component's own test file doesn't, following the WAI-ARIA Authoring Practices.
- CI runs `pnpm --filter harmonium run test:coverage`, which fails if coverage drops below the thresholds in `packages/harmonium/vitest.config.ts`. Raise them when coverage goes up.

## Bundle size

CI runs `pnpm size` after `pnpm build` and fails when a budget is exceeded. The script is `packages/harmonium/scripts/check-size.ts`; the limits live there too.

How it measures:

- Each JS case is a one-line app (for example `export {Button} from 'harmonium'`) bundled with esbuild the way a production app build would bundle it: resolved through the package's `exports` and `sideEffects`, tree-shaken, minified, `NODE_ENV=production`.
- React and ReactDOM are replaced by a stand-in, since the app already ships them. `@base-ui/react` and `clsx` are bundled in, so a single-component number is what an app actually pays, Base UI included. One case leaves them out to show Harmonium's own code.
- `styles.css` (`dist/index.css`: tokens plus all component CSS) is measured as published.
- Sizes are gzip, level 9. The versions measured are the ones in `pnpm-lock.yaml`.

Each limit is set about 10% above the measurement when it was set. If your change grows a number on purpose, raise the limit in the same PR and say why. Never raise it just to make CI pass.

Two cases (`Heading`, `TableRow`) also check that the other components defined in the same file drop out of the bundle. That relies on the build marking each `React.forwardRef`/`memo`/`createContext` call `@__PURE__` and folding `X.displayName = 'X'` into it (`annotatePure` in `packages/harmonium/tsup.config.ts`); write components the usual way and `check-dist.ts` fails if one isn't covered.

The README's size badge and "Bundle size" numbers come from this script. When they change noticeably, run `pnpm --filter harmonium run size --badge` to update the badge and update the numbers in `README.md` and `packages/docs/stories/Introduction.mdx`. The competitor numbers in the comparison tables come from `pnpm --filter harmonium run size:competitors` (needs network; not run in CI), which measures pinned versions of each library the same way; update the versions and date when you re-run it.

Each component is its own module in `dist/` (and its own `harmonium/<component>` entry), so `import {Button} from 'harmonium'` only pulls in Button's JS. CSS still ships as one stylesheet for every component, `harmonium/styles.css`; there is no per-component CSS.

## Releasing

Harmonium has two release lines:

| Line | Branch | npm dist-tag | What ships |
|------|--------|--------------|------------|
| 9.x (active) | `main` | `next` until 9.0.0, then `latest` | New features and breaking changes |
| 8.x (maintenance) | `8.x` | `v8` once 9.0.0 is `latest` | Bug and security fixes only |

### 9.x (`main`)

Releases use [Changesets](https://github.com/changesets/changesets). `main` is in prerelease mode (`alpha`), so versions look like `9.0.0-alpha.N`.

1. In your PR, run `pnpm changeset` and describe the change. Choose `patch`, `minor` or `major` for `harmonium`.
2. After merge, the Release workflow opens or updates a **Version Packages** PR that bumps versions and writes `CHANGELOG.md`.
3. Merge the Version Packages PR.
4. Run **Actions → Release → Run workflow** on `main` with tag `next`. It runs the full Test workflow (build, tests, lint), then waits for a maintainer to approve the `npm` environment. Once approved, it checks the dist-tag (`scripts/check-dist-tag.mjs`), builds, publishes with npm provenance and pushes the git tag. Re-running a finished release is safe: an already-published version and an existing tag are skipped.

Publishing uses [npm trusted publishing](https://docs.npmjs.com/trusted-publishers). npm accepts publishes only from `release.yml` running in the `npm` GitHub environment, so there is no npm token to manage. Reviewers for the `npm` environment are set in the repo settings (Settings → Environments → npm).

To move to beta or a stable 9.0.0: `pnpm changeset pre exit` (or `pre enter beta`), then publish stable with tag `latest`. Before that, tag the last v8 release: `npm dist-tag add harmonium@8.x.y v8`.

### 8.x (`8.x`)

Fixes for v8 go in PRs against the `8.x` branch. To release, bump the version in a PR (`npm version patch --no-git-tag-version`), merge it, then run **Actions → Release v8 → Run workflow** on `8.x` and approve the `npm` environment. The workflow picks the dist-tag itself: `latest` while v8 is still `latest` on npm, then `v8` once 9.0.0 is `latest`, so an 8.x patch never takes `latest` back.
