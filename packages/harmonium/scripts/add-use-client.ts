/**
 * Prepend 'use client' to every JS file in dist/ (entries, component entries
 * in dist/components/ and shared chunks). Every component is a client
 * component (hooks, context, event handlers); the directive lets React Server
 * Component frameworks (e.g. the Next.js App Router) import Harmonium from
 * server components. Done after tsup because its tree-shaking pass drops
 * module-level directives and `banner` output.
 */
import {readFileSync, writeFileSync, readdirSync, existsSync} from 'fs'
import {join} from 'path'

const DIST = join(import.meta.dirname, '..', 'dist')
const DIRECTIVE = "'use client';\n"

const files = readdirSync(DIST, {recursive: true, encoding: 'utf8'}).filter((f) => /\.c?js$/.test(f))
for (const file of files) {
  const path = join(DIST, file)
  const code = readFileSync(path, 'utf8')
  if (/^['"]use client['"]/.test(code)) continue
  writeFileSync(path, DIRECTIVE + code)

  // Shift the source map down one line to match.
  const mapPath = `${path}.map`
  if (existsSync(mapPath)) {
    const map = JSON.parse(readFileSync(mapPath, 'utf8'))
    map.mappings = ';' + map.mappings
    writeFileSync(mapPath, JSON.stringify(map))
  }
}

console.log(`Added 'use client' to ${files.length} dist JS files`)
