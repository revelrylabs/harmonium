import {defineConfig} from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
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
})
