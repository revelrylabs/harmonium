/**
 * Measure what Harmonium costs an app, and fail when a budget is exceeded.
 *
 * Each JS case bundles a one-line app with esbuild the way a production app
 * build would: resolved through package.json `exports` and `sideEffects`,
 * tree-shaken and minified. React is replaced by a stand-in (the app already
 * has it). Dependencies (@base-ui/react, clsx) are bundled in unless a case
 * excludes them, so a single-component number is what the app actually ships.
 * CSS is measured as published. All sizes are gzip level 9.
 *
 * Run after `pnpm build`: `pnpm --filter harmonium run size`. When a change
 * grows a number on purpose, raise its limit here in the same PR and say why.
 * `pnpm --filter harmonium run size --badge` also updates the size badge in
 * README.md. See "Bundle size" in CONTRIBUTING.md.
 */
import {appendFileSync, readFileSync, writeFileSync} from 'fs'
import {join} from 'path'
import {gzipSync} from 'zlib'
import {bundleApp} from './size-utils'

const ROOT = join(import.meta.dirname, '..')
const KB = 1024

interface Case {
  name: string
  /** One-line app entry (bundled), or a dist file (measured as is). */
  code?: string
  file?: string
  /** Packages replaced by a stand-in besides React. */
  exclude?: string[]
  /** Budget in KB, gzipped. About 10% above the size when it was set. */
  limit: number
  /** Components that must not be in the bundle (sibling exports of the same file). */
  absent?: string[]
  /** Shown in the README badge. */
  badge?: 'js' | 'css'
}

const CASES: Case[] = [
  {
    name: 'All components (Harmonium code only)',
    code: "export * from 'harmonium'",
    exclude: ['@base-ui/react', 'clsx'],
    limit: 15,
  },
  {name: 'All components + Base UI', code: "export * from 'harmonium'", limit: 136, badge: 'js'},
  {name: 'styles.css (tokens + all components)', file: 'dist/index.css', limit: 13.5, badge: 'css'},
  // 10% of half a kilobyte is a few dozen bytes, so these round up to 0.6 KB.
  {name: "import {Button} from 'harmonium'", code: "export {Button} from 'harmonium'", limit: 0.6},
  {name: "import {Button} from 'harmonium/button'", code: "export {Button} from 'harmonium/button'", limit: 0.6},
  {name: "import {Dialog} from 'harmonium'", code: "export {Dialog} from 'harmonium'", limit: 26},
  // Unused components defined in the same file must drop out too (Text, the
  // other Table parts); see annotatePure in tsup.config.ts.
  {name: "import {Heading} from 'harmonium'", code: "export {Heading} from 'harmonium'", limit: 0.6, absent: ['Text']},
  {
    name: "import {TableRow} from 'harmonium'",
    code: "export {TableRow} from 'harmonium'",
    limit: 0.6,
    absent: ['Table', 'TableHead', 'TableBody', 'TableHeader', 'TableCell'],
  },
]

async function measure(c: Case): Promise<Buffer> {
  if (c.file) return readFileSync(join(ROOT, c.file))
  const result = await bundleApp(c.code!, ROOT, c.exclude)
  // Guard against measuring source files instead of the built package.
  const notDist = Object.keys(result.metafile.inputs).filter(
    (p) => !p.startsWith('dist/') && !p.includes('node_modules') && !p.startsWith('shim:') && p !== '<stdin>',
  )
  if (notDist.length > 0) throw new Error(`${c.name}: bundled files outside dist/: ${notDist.join(', ')}`)
  return result.output
}

const fmt = (bytes: number) => `${(bytes / KB).toFixed(2)} KB`
const rows: string[] = []
const failures: string[] = []
const badge: Record<string, number> = {}

for (const c of CASES) {
  const raw = await measure(c)
  const gzip = gzipSync(raw, {level: 9}).length
  const ok = gzip <= c.limit * KB
  if (c.badge) badge[c.badge] = gzip
  if (!ok) failures.push(`${c.name}: ${fmt(gzip)} gzipped, over the ${c.limit} KB limit`)
  const text = raw.toString('utf8')
  for (const name of c.absent ?? []) {
    // displayName:"X" (annotated) or .displayName="X" (a plain assignment)
    if (new RegExp(`displayName[:=]"${name}"`).test(text)) failures.push(`${c.name}: bundles ${name}, which the app doesn't use`)
  }
  rows.push(`| ${c.name} | ${fmt(raw.length)} | ${fmt(gzip)} | ${c.limit} KB | ${ok ? 'ok' : 'OVER'} |`)
}

const table = [
  '| Case | Size | Gzipped | Limit (gzip) | |',
  '| --- | --: | --: | --: | --- |',
  ...rows,
].join('\n')
console.log(table)
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Bundle size\n\n${table}\n`)
}

// The README badge is static (npm's `latest` is still v8, so a badge service
// would measure the wrong package); keep it in step with these numbers.
const README = join(ROOT, '..', '..', 'README.md')
const BADGE = /https:\/\/img\.shields\.io\/badge\/all_components_%28gzip%29-[^)\s]+-blue/
const badgeUrl = `https://img.shields.io/badge/all_components_%28gzip%29-${(badge.js / KB).toFixed(1)}_KB_JS_%2B_${(badge.css / KB).toFixed(1)}_KB_CSS-blue`
const readme = readFileSync(README, 'utf8')
if (process.argv.includes('--badge')) {
  writeFileSync(README, readme.replace(BADGE, badgeUrl))
  console.log(`\nUpdated the README size badge: ${badgeUrl}`)
} else if (readme.match(BADGE)?.[0] !== badgeUrl) {
  console.log('\nThe README size badge is out of date; run `pnpm --filter harmonium run size --badge` to update it.')
}

if (failures.length > 0) {
  console.error(`\nSize limit exceeded:\n- ${failures.join('\n- ')}`)
  console.error('If the growth is intended, raise the limit in scripts/check-size.ts and explain why in the PR.')
  process.exit(1)
}
