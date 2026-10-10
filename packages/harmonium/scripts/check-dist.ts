/**
 * Post-build sanity checks on dist/. Fails the build when:
 * - a CSS Module import compiled to an empty object (components render unstyled)
 * - a class referenced from JS is missing from dist/index.css
 * - the global CSS build rewrote text inside url(...) (e.g. a data-URI SVG)
 */
import {readFileSync} from 'fs'
import {join} from 'path'

const DIST = join(import.meta.dirname, '..', 'dist')
const read = (file: string) => readFileSync(join(DIST, file), 'utf8')

const errors: string[] = []

for (const file of ['index.js', 'index.cjs']) {
  const empty = read(file).match(/\w+_default = \{\};/g) ?? []
  if (empty.length > 0) {
    errors.push(`${file}: ${empty.length} CSS Module imports compiled to {} (${empty.slice(0, 3).join(' ')} ...)`)
  }
}

const js = read('index.js')
const css = read('index.css')
const classes = new Set<string>()
for (const [, body] of js.matchAll(/var \w+_default = \{([^}]*)\}/g)) {
  for (const [, name] of body.matchAll(/"([\w-]+)"/g)) classes.add(name)
}
if (classes.size === 0) errors.push('index.js: found no CSS Module class maps')
const missing = [...classes].filter((name) => !css.includes(`.${name}`))
if (missing.length > 0) {
  errors.push(`index.css: missing ${missing.length} classes referenced from JS: ${missing.slice(0, 5).join(', ')}`)
}

const corruptedUrls = read('harmonium.css').match(/url\([^)]*hm-[^)]*\)/g) ?? []
if (corruptedUrls.length > 0) {
  errors.push(`harmonium.css: class renaming leaked into url(): ${corruptedUrls[0].slice(0, 80)}`)
}

if (errors.length > 0) {
  console.error(`dist check failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log(`dist check passed (${classes.size} scoped classes)`)
