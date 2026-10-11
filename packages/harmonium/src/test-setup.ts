import '@testing-library/jest-dom/vitest'
import {expect} from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'
import type {AxeMatchers} from 'vitest-axe/matchers'

// `expect(await axe(container)).toHaveNoViolations()` in any test file
expect.extend(axeMatchers)

// jsdom has no canvas. axe probes it during color-contrast checks, and jsdom
// logs a "Not implemented" error for every call.
HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext

// jsdom has no PointerEvent; Base UI dispatches one to forward clicks from the
// visible control (e.g. Checkbox's <span role="checkbox">) to its hidden input.
if (typeof window !== 'undefined' && typeof window.PointerEvent === 'undefined') {
  class PointerEvent extends MouseEvent {
    readonly pointerId: number
    readonly pointerType: string
    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init)
      this.pointerId = init.pointerId ?? 0
      this.pointerType = init.pointerType ?? ''
    }
  }
  window.PointerEvent = PointerEvent as unknown as typeof window.PointerEvent
}

declare module 'vitest' {
  // The type parameter must match vitest's own declaration to merge with it.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  interface Assertion<T = any> extends AxeMatchers {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
