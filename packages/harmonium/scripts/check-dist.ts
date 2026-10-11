/**
 * Post-build sanity checks on dist/. Fails the build when:
 * - a CSS Module import compiled to an empty object (components render unstyled)
 * - a class referenced from JS is missing from dist/index.css
 * - a scoped class name lacks the `hm_` prefix (could collide with app CSS Modules)
 * - the global CSS build rewrote text inside url(...) (e.g. a data-URI SVG)
 * - styles.css doesn't define the design tokens its rules depend on
 * - styles.layer.css isn't wrapped in `@layer harmonium`
 * - a JS file (entry or shared chunk) doesn't start with 'use client' (React
 *   Server Components)
 * - a component folder has no entry in dist/components/, or an `exports`
 *   target in package.json doesn't exist
 * - per-component CSS was left next to the component entries
 */
import {existsSync, readFileSync, readdirSync} from 'fs'
import {join} from 'path'

const ROOT = join(import.meta.dirname, '..')
const DIST = join(ROOT, 'dist')
const read = (file: string) => readFileSync(join(DIST, file), 'utf8')

const errors: string[] = []
const distFiles = readdirSync(DIST, {recursive: true, encoding: 'utf8'})
const jsFiles = distFiles.filter((f) => /\.c?js$/.test(f))
const esmFiles = jsFiles.filter((f) => f.endsWith('.js'))

for (const file of jsFiles) {
  const empty = read(file).match(/\w+_default = \{\};/g) ?? []
  if (empty.length > 0) {
    errors.push(`${file}: ${empty.length} CSS Module imports compiled to {} (${empty.slice(0, 3).join(' ')} ...)`)
  }
}

const css = read('index.css')
const classes = new Set<string>()
for (const file of esmFiles) {
  for (const [, body] of read(file).matchAll(/var \w+_default = \{([^}]*)\}/g)) {
    for (const [, name] of body.matchAll(/"([\w-]+)"/g)) classes.add(name)
  }
}
if (classes.size === 0) errors.push('dist/*.js: found no CSS Module class maps')
const missing = [...classes].filter((name) => !css.includes(`.${name}`))
if (missing.length > 0) {
  errors.push(`index.css: missing ${missing.length} classes referenced from JS: ${missing.slice(0, 5).join(', ')}`)
}
const unprefixed = [...classes].filter((name) => !name.startsWith('hm_'))
if (unprefixed.length > 0) {
  errors.push(`dist/*.js: ${unprefixed.length} scoped classes lack the hm_ prefix: ${unprefixed.slice(0, 5).join(', ')}`)
}

const corruptedUrls = read('harmonium.css').match(/url\([^)]*hm-[^)]*\)/g) ?? []
if (corruptedUrls.length > 0) {
  errors.push(`harmonium.css: class renaming leaked into url(): ${corruptedUrls[0].slice(0, 80)}`)
}

if (!css.includes('--harmonium-color-brand-primary:')) {
  errors.push('index.css: design tokens are missing (styles.css alone would render unstyled)')
}

const layered = read('index.layer.css')
if (!layered.startsWith('@layer harmonium {') || !layered.includes('--harmonium-color-brand-primary:')) {
  errors.push('index.layer.css: expected tokens and component CSS inside `@layer harmonium { ... }`')
}

for (const file of jsFiles) {
  if (!/^['"]use client['"]/.test(read(file))) {
    errors.push(`${file}: missing the 'use client' directive (breaks React Server Components)`)
  }
}

// Every component folder is importable as harmonium/<kebab-name>.
const toKebab = (name: string) =>
  name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
const componentDirs = readdirSync(join(ROOT, 'src', 'components'), {withFileTypes: true}).filter(
  (d) => d.isDirectory() && existsSync(join(ROOT, 'src', 'components', d.name, 'index.ts')),
)
for (const dir of componentDirs) {
  for (const ext of ['js', 'cjs', 'd.ts', 'd.cts']) {
    const file = `components/${toKebab(dir.name)}.${ext}`
    if (!existsSync(join(DIST, file))) errors.push(`${file}: missing entry for src/components/${dir.name}`)
  }
}

// Every target in package.json `exports` exists (patterns checked against Button).
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const targets = (value: unknown): string[] =>
  typeof value === 'string' ? [value] : Object.values(value as object).flatMap(targets)
for (const target of targets(pkg.exports)) {
  const path = target.replace('*', 'button')
  if (!existsSync(join(ROOT, path))) errors.push(`package.json exports: ${path} does not exist`)
}

const strayCss = distFiles.filter((f) => f.startsWith('components') && /\.css(\.map)?$/.test(f))
if (strayCss.length > 0) {
  errors.push(`dist/components: per-component CSS should be removed by build-css.ts (${strayCss[0]} ...)`)
}

if (errors.length > 0) {
  console.error(`dist check failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log(
  `dist check passed (${classes.size} scoped classes, ${jsFiles.length} JS files, ${componentDirs.length} component entries)`,
)
