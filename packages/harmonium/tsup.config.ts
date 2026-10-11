import {readFileSync, readdirSync, existsSync} from 'fs'
import {basename, dirname, join} from 'path'
import type {Plugin} from 'esbuild'
import {defineConfig} from 'tsup'

const COMPONENTS = join(import.meta.dirname, 'src', 'components')

/** ToggleGroup -> toggle-group; the subpath consumers import (harmonium/toggle-group). */
function toKebab(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

// One entry per component folder, plus the root barrel. Every component then
// lands in its own module, so bundlers drop the ones an app doesn't import,
// whether it imports from 'harmonium' or 'harmonium/<component>'.
const componentEntries = Object.fromEntries(
  readdirSync(COMPONENTS, {withFileTypes: true})
    .filter((d) => d.isDirectory() && existsSync(join(COMPONENTS, d.name, 'index.ts')))
    .map((d) => [`components/${toKebab(d.name)}`, `src/components/${d.name}/index.ts`]),
)

const PREFIX = 'hm_'

/**
 * Prefix CSS Module class names: esbuild's `local-css` names classes
 * `<file>_<class>` (Button_root), which an app bundling its own CSS Modules
 * with esbuild can generate too. esbuild derives the name from the file
 * path, so resolve `Button.module.css` to a virtual `hm_Button` path and load
 * the real file's contents for it, giving `hm_Button_root`. The virtual path
 * has no `.css` extension so tsup's own CSS loader leaves it alone.
 */
const prefixCssModules: Plugin = {
  name: 'harmonium-prefix-css-modules',
  setup(build) {
    build.onResolve({filter: /\.module\.css$/}, (args) => {
      const file = join(args.resolveDir, args.path)
      return {path: join(dirname(file), PREFIX + basename(file, '.module.css')), namespace: 'file'}
    })
    build.onLoad({filter: new RegExp(`[\\\\/]${PREFIX}[A-Za-z0-9]+$`), namespace: 'file'}, (args) => {
      const file = join(dirname(args.path), `${basename(args.path).slice(PREFIX.length)}.module.css`)
      return {contents: readFileSync(file, 'utf8'), loader: 'local-css', resolveDir: dirname(file), watchFiles: [file]}
    })
  },
}

export default defineConfig({
  entry: {index: 'src/index.ts', ...componentEntries},
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  splitting: true,
  treeshake: true,
  // Scope CSS Module class names; without this, styles imports compile to {}.
  // tsup's CSS plugin only reads the '.css' key, and the bundle imports only
  // *.module.css files (tokens.css is copied separately).
  loader: {'.css': 'local-css'},
  esbuildPlugins: [prefixCssModules],
})
