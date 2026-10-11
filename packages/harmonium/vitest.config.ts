import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    setupFiles: ['./src/test-setup.ts'],
    // The first test in a file pays for loading Base UI and axe; on a busy
    // machine or CI runner that can pass vitest's 5s default.
    testTimeout: 15000,
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/components/**/*.{ts,tsx}'],
      exclude: ['**/*.test.*', '**/index.ts'],
    },
  },
})
