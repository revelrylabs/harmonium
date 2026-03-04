export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

export type ResponsiveValue<T> =
  | T
  | {base?: T; sm?: T; md?: T; lg?: T; xl?: T}

const BREAKPOINTS: Breakpoint[] = ['sm', 'md', 'lg', 'xl']

/**
 * Check if a value is a responsive object (has breakpoint keys).
 */
function isResponsiveObject<T>(
  value: ResponsiveValue<T>,
): value is {base?: T; sm?: T; md?: T; lg?: T; xl?: T} {
  if (value === null || value === undefined) return false
  if (typeof value !== 'object') return false
  if (Array.isArray(value)) return false
  const keys = Object.keys(value)
  return keys.some((k) =>
    ['base', 'sm', 'md', 'lg', 'xl'].includes(k),
  )
}

/**
 * Convert a responsive prop into data attributes for CSS targeting.
 * Used for enum props (direction, gap, align, justify, etc.).
 *
 * Static: responsiveDataAttrs('gap', 'md') → { 'data-gap': 'md' }
 * Responsive: responsiveDataAttrs('gap', { base: 'sm', lg: 'xl' })
 *   → { 'data-gap': 'sm', 'data-gap-lg': 'xl' }
 */
export function responsiveDataAttrs(
  name: string,
  value: ResponsiveValue<string | boolean> | undefined,
): Record<string, string | boolean | undefined> {
  if (value === undefined) return {}

  if (!isResponsiveObject(value)) {
    return {[`data-${name}`]: value as string | boolean}
  }

  const attrs: Record<string, string | boolean | undefined> = {}

  if (value.base !== undefined) {
    attrs[`data-${name}`] = value.base
  }

  for (const bp of BREAKPOINTS) {
    if (value[bp] !== undefined) {
      attrs[`data-${name}-${bp}`] = value[bp]
    }
  }

  return attrs
}

/**
 * Convert a responsive prop into CSS custom property inline styles.
 * Used for dynamic props (Grid columns, GridCol span).
 *
 * Static: responsiveStyles('grid-columns', 3, v => `repeat(${v}, 1fr)`)
 *   → { '--grid-columns': 'repeat(3, 1fr)' }
 *
 * Responsive: responsiveStyles('grid-columns', { base: 1, md: 2, lg: 3 }, v => `repeat(${v}, 1fr)`)
 *   → { '--grid-columns': 'repeat(1, 1fr)', '--grid-columns-md': 'repeat(2, 1fr)', '--grid-columns-lg': 'repeat(3, 1fr)' }
 */
export function responsiveStyles(
  name: string,
  value: ResponsiveValue<string | number> | undefined,
  transform?: (v: string | number) => string,
): Record<string, string> {
  if (value === undefined) return {}

  const fmt = (v: string | number) => (transform ? transform(v) : String(v))

  if (!isResponsiveObject(value)) {
    return {[`--${name}`]: fmt(value as string | number)}
  }

  const styles: Record<string, string> = {}

  if (value.base !== undefined) {
    styles[`--${name}`] = fmt(value.base)
  }

  for (const bp of BREAKPOINTS) {
    if (value[bp] !== undefined) {
      styles[`--${name}-${bp}`] = fmt(value[bp]!)
    }
  }

  return styles
}

/**
 * Check if a responsive value has any breakpoint-specific overrides.
 * Used to add a marker data attribute for CSS targeting.
 */
export function hasResponsiveOverrides<T>(
  value: ResponsiveValue<T> | undefined,
): boolean {
  if (value === undefined) return false
  if (!isResponsiveObject(value)) return false
  return BREAKPOINTS.some((bp) => value[bp] !== undefined)
}
