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
 * See "Bundle size" in CONTRIBUTING.md.
 */
import {appendFileSync, readFileSync} from 'fs'
import {createRequire} from 'module'
import {join} from 'path'
import {gzipSync} from 'zlib'
import {build, type Plugin} from 'esbuild'

const ROOT = join(import.meta.dirname, '..')
const KB = 1024
const require = createRequire(join(ROOT, 'package.json'))

interface Case {
  name: string
  /** One-line app entry (bundled), or a dist file (measured as is). */
  code?: string
  file?: string
  /** Packages replaced by a stand-in besides React. */
  exclude?: string[]
  /** Budget in KB, gzipped. About 10% above the size when it was set. */
  limit: number
}

const CASES: Case[] = [
  {
    name: 'All components (Harmonium code only)',
    code: "export * from 'harmonium'",
    exclude: ['@base-ui/react', 'clsx'],
    limit: 14.5,
  },
  {name: 'All components + Base UI', code: "export * from 'harmonium'", limit: 136},
  {name: 'styles.css (tokens + all components)', file: 'dist/index.css', limit: 12.5},
  // 10% of half a kilobyte is a few dozen bytes, so these round up to 0.6 KB.
  {name: "import {Button} from 'harmonium'", code: "export {Button} from 'harmonium'", limit: 0.6},
  {name: "import {Button} from 'harmonium/button'", code: "export {Button} from 'harmonium/button'", limit: 0.6},
  {name: "import {Dialog} from 'harmonium'", code: "export {Dialog} from 'harmonium'", limit: 26},
]

/**
 * Replace packages (React, plus any a case excludes) with a one-line stand-in. Marking it external instead would
 * leave one `import * as React from 'react'` per module in the output, which
 * an app that bundles React never ships, and would inflate the numbers. The
 * stand-in costs a few bytes of interop helper, the same for every case.
 */
function shim(packages: string[]): Plugin {
  const filter = new RegExp(`^(${packages.join('|')})(/.*)?$`)
  return {
    name: 'shim',
    setup(b) {
      b.onResolve({filter}, (args) => ({path: args.path, namespace: 'shim'}))
      b.onLoad({filter: /.*/, namespace: 'shim'}, (args) => {
        const names = Object.keys(require(args.path)).filter((k) => /^[A-Za-z_$][\w$]*$/.test(k) && k !== 'default')
        const lines = names.map((k) => `export const ${k} = /* @__PURE__ */ m(${JSON.stringify(k)})`)
        return {
          contents: [`const m = (k) => globalThis[${JSON.stringify(args.path)}][k]`, 'export default {}', ...lines].join('\n'),
          loader: 'js',
        }
      })
    },
  }
}

async function measure(c: Case): Promise<Buffer> {
  if (c.file) return readFileSync(join(ROOT, c.file))
  const result = await build({
    stdin: {contents: c.code!, resolveDir: ROOT, loader: 'js'},
    absWorkingDir: ROOT,
    bundle: true,
    minify: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    write: false,
    logLevel: 'error',
    metafile: true,
    define: {'process.env.NODE_ENV': '"production"'},
    plugins: [shim(['react', 'react-dom', ...(c.exclude ?? [])])],
  })
  // Guard against measuring source files instead of the built package.
  const notDist = Object.keys(result.metafile.inputs).filter(
    (p) => !p.startsWith('dist/') && !p.includes('node_modules') && !p.startsWith('shim:') && p !== '<stdin>',
  )
  if (notDist.length > 0) throw new Error(`${c.name}: bundled files outside dist/: ${notDist.join(', ')}`)
  return Buffer.from(result.outputFiles[0].contents)
}

const fmt = (bytes: number) => `${(bytes / KB).toFixed(2)} KB`
const rows: string[] = []
const failures: string[] = []

for (const c of CASES) {
  const raw = await measure(c)
  const gzip = gzipSync(raw, {level: 9}).length
  const ok = gzip <= c.limit * KB
  if (!ok) failures.push(`${c.name}: ${fmt(gzip)} gzipped, over the ${c.limit} KB limit`)
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

if (failures.length > 0) {
  console.error(`\nSize limit exceeded:\n- ${failures.join('\n- ')}`)
  console.error('If the growth is intended, raise the limit in scripts/check-size.ts and explain why in the PR.')
  process.exit(1)
}
