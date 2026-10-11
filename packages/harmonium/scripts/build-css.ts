/**
 * Finish dist/ CSS after tsup:
 * - dist/index.css (harmonium/styles.css) gets the design tokens prepended,
 *   so the one documented import is enough to style components.
 * - dist/index.layer.css (harmonium/styles.layer.css) is the same CSS inside
 *   `@layer harmonium`, so any unlayered app CSS (including a single
 *   className) or a later-declared layer overrides it.
 */
import {readFileSync, writeFileSync} from 'fs'
import {join} from 'path'

const DIST = join(import.meta.dirname, '..', 'dist')
const tokens = readFileSync(join(import.meta.dirname, '..', 'src', 'tokens', 'tokens.css'), 'utf8')
const css = readFileSync(join(DIST, 'index.css'), 'utf8')

if (css.includes('--harmonium-color-brand-primary:')) {
  throw new Error('dist/index.css already contains tokens; was build-css run twice?')
}

const prefix = `/* === Design Tokens === */\n${tokens.trimEnd()}\n\n`
writeFileSync(join(DIST, 'index.css'), prefix + css)

// Keep the source map aligned: each prepended line is one empty mapping line.
const mapPath = join(DIST, 'index.css.map')
const map = JSON.parse(readFileSync(mapPath, 'utf8'))
map.mappings = ';'.repeat(prefix.split('\n').length - 1) + map.mappings
writeFileSync(mapPath, JSON.stringify(map))

const body = (prefix + css).replace(/\/\*# sourceMappingURL=.*\*\/\s*$/, '').trimEnd()
writeFileSync(join(DIST, 'index.layer.css'), `@layer harmonium {\n${body}\n}\n`)

console.log('Built dist/index.css (with tokens) and dist/index.layer.css')
