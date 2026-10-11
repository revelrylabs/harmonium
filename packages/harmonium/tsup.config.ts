import {readFileSync, readdirSync, existsSync} from 'fs'
import {basename, dirname, join} from 'path'
import type {Plugin} from 'esbuild'
import {defineConfig} from 'tsup'
import ts from 'typescript'

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

/** React calls that create a value without side effects. */
const PURE_REACT_CALLS = new Set(['forwardRef', 'memo', 'createContext'])

/**
 * Mark top-level component definitions as side-effect free, so bundlers drop
 * the ones an app doesn't use (import {Heading} would otherwise keep Text,
 * which lives in the same file). Two things block that in plain source:
 *
 * - `React.forwardRef(...)` is a call the bundler can't see into, so it's
 *   kept unless annotated with a `@__PURE__` comment.
 * - `X.displayName = 'X'` is a top-level assignment, which is a side effect
 *   that keeps X even when the call is annotated.
 *
 * So `const X = React.forwardRef(...)` plus `X.displayName = 'X'` compiles to
 * `const X = Object.assign(React.forwardRef(...), {displayName: 'X'})` with
 * both calls annotated `@__PURE__`; other React.forwardRef, memo and
 * createContext calls just get the annotation.
 * Doing this at build time keeps the source idiomatic and covers new
 * components automatically; check-dist.ts fails if one slips through.
 */
const annotatePure: Plugin = {
  name: 'harmonium-annotate-pure',
  setup(build) {
    build.onLoad({filter: /[\\/]src[\\/]components[\\/].*\.tsx$/}, (args) => {
      const source = readFileSync(args.path, 'utf8')
      const file = ts.createSourceFile(args.path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

      const displayNames = new Map<string, ts.ExpressionStatement>()
      for (const statement of file.statements) {
        if (!ts.isExpressionStatement(statement)) continue
        const e = statement.expression
        if (
          ts.isBinaryExpression(e) &&
          e.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
          ts.isPropertyAccessExpression(e.left) &&
          e.left.name.text === 'displayName' &&
          ts.isIdentifier(e.left.expression)
        ) {
          displayNames.set(e.left.expression.text, statement)
        }
      }

      const edits: {at: number; end?: number; text: string}[] = []
      for (const statement of file.statements) {
        if (!ts.isVariableStatement(statement)) continue
        for (const decl of statement.declarationList.declarations) {
          let init = decl.initializer
          while (init && (ts.isAsExpression(init) || ts.isParenthesizedExpression(init) || ts.isSatisfiesExpression(init))) {
            init = init.expression
          }
          if (
            !init ||
            !ts.isCallExpression(init) ||
            !ts.isPropertyAccessExpression(init.expression) ||
            !ts.isIdentifier(init.expression.expression) ||
            init.expression.expression.text !== 'React' ||
            !PURE_REACT_CALLS.has(init.expression.name.text) ||
            !ts.isIdentifier(decl.name)
          ) {
            continue
          }
          const assignment = displayNames.get(decl.name.text)
          if (assignment) {
            const value = (assignment.expression as ts.BinaryExpression).right.getText(file)
            edits.push({at: init.getStart(file), text: '/* @__PURE__ */ Object.assign(/* @__PURE__ */ '})
            edits.push({at: init.getEnd(), text: `, {displayName: ${value}})`})
            edits.push({at: assignment.getStart(file), end: assignment.getEnd(), text: ''})
          } else {
            edits.push({at: init.getStart(file), text: '/* @__PURE__ */ '})
          }
        }
      }

      let contents = source
      for (const edit of edits.sort((a, b) => b.at - a.at)) {
        contents = contents.slice(0, edit.at) + edit.text + contents.slice(edit.end ?? edit.at)
      }
      return {contents, loader: 'tsx'}
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
  esbuildPlugins: [prefixCssModules, annotatePure],
})
