/**
 * Shared by check-size.ts and measure-competitors.ts, so Harmonium and the
 * libraries it's compared with are measured the same way.
 */
import {createRequire} from 'module'
import {join} from 'path'
import {build, type Metafile, type Plugin} from 'esbuild'

const require = createRequire(join(import.meta.dirname, '..', 'package.json'))

/**
 * Replace packages (React, plus any a case excludes) with a one-line stand-in. Marking it external instead would
 * leave one `import * as React from 'react'` per module in the output, which
 * an app that bundles React never ships, and would inflate the numbers. The
 * stand-in costs a few bytes of interop helper, the same for every case.
 */
export function shim(packages: string[]): Plugin {
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

/**
 * Bundle a one-line app the way a production app build would: resolved
 * through package.json `exports` and `sideEffects`, tree-shaken, minified,
 * NODE_ENV=production. React (and any `exclude`d package) is a stand-in.
 */
export async function bundleApp(
  code: string,
  resolveDir: string,
  exclude: string[] = [],
): Promise<{output: Buffer; metafile: Metafile}> {
  const result = await build({
    stdin: {contents: code, resolveDir, loader: 'js'},
    absWorkingDir: resolveDir,
    bundle: true,
    minify: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    write: false,
    logLevel: 'error',
    metafile: true,
    // Packages that import their own CSS (measured separately) contribute none.
    loader: {'.css': 'empty'},
    define: {'process.env.NODE_ENV': '"production"'},
    plugins: [shim(['react', 'react-dom', ...exclude])],
  })
  return {output: Buffer.from(result.outputFiles[0].contents), metafile: result.metafile}
}
