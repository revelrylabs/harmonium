/**
 * Minimum viewport widths, in px, of the breakpoints used by responsive props
 * (`{base, sm, md, lg, xl}`) and `Show`.
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

/** A breakpoint name: `'sm' | 'md' | 'lg' | 'xl'`. */
export type Breakpoint = keyof typeof breakpoints
