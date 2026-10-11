/** Class-name helpers shared by build-global-css.ts and generate-llm-docs.ts. */

/** ToggleGroup -> toggle-group: the hm-* class and harmonium/<subpath> name. */
export function toKebab(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * Swap comments, strings and url(...) values for placeholders so the class
 * regexes can't touch their contents (e.g. `www.w3.org` in a data-URI SVG).
 */
export function protect(css: string): {masked: string; restore: (s: string) => string} {
  const saved: string[] = []
  const masked = css.replace(
    /\/\*[\s\S]*?\*\/|url\((?:"[^"]*"|'[^']*'|[^)]*)\)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
    (match) => `__HM_PROTECTED_${saved.push(match) - 1}__`,
  )
  const restore = (s: string) =>
    s.replace(/__HM_PROTECTED_(\d+)__/g, (_, i) => saved[Number(i)])
  return {masked, restore}
}

/**
 * Extract all class names from a CSS file (e.g., .root, .header, .body)
 */
export function extractClassNames(css: string): string[] {
  const names = new Set<string>()
  const re = /\.([a-zA-Z][a-zA-Z0-9]*)/g
  let match
  while ((match = re.exec(css)) !== null) {
    names.add(match[1])
  }
  return Array.from(names)
}

/** The plain-HTML class for a CSS Module class: Card's .root -> hm-card, .header -> hm-card-header. */
export function globalClassName(kebabComponent: string, cls: string): string {
  return cls === 'root' ? `hm-${kebabComponent}` : `hm-${kebabComponent}-${toKebab(cls)}`
}
