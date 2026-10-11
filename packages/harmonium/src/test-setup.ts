import '@testing-library/jest-dom/vitest'
import {expect} from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'
import type {AxeMatchers} from 'vitest-axe/matchers'

// `expect(await axe(container)).toHaveNoViolations()` in any test file
expect.extend(axeMatchers)

// jsdom has no canvas. axe probes it during color-contrast checks, and jsdom
// logs a "Not implemented" error for every call.
HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext

declare module 'vitest' {
  // The type parameter must match vitest's own declaration to merge with it.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  interface Assertion<T = any> extends AxeMatchers {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
