import {describe, it, expect} from 'vitest'
import {
  responsiveDataAttrs,
  responsiveStyles,
  hasResponsiveOverrides,
} from './responsive'

describe('responsiveDataAttrs', () => {
  it('returns empty object for undefined', () => {
    expect(responsiveDataAttrs('gap', undefined)).toEqual({})
  })

  it('handles static string value', () => {
    expect(responsiveDataAttrs('gap', 'md')).toEqual({'data-gap': 'md'})
  })

  it('handles static boolean value', () => {
    expect(responsiveDataAttrs('wrap', true)).toEqual({'data-wrap': true})
  })

  it('handles responsive object with base only', () => {
    expect(responsiveDataAttrs('gap', {base: 'sm'})).toEqual({
      'data-gap': 'sm',
    })
  })

  it('handles responsive object with base and breakpoints', () => {
    expect(responsiveDataAttrs('gap', {base: 'sm', md: 'md', lg: 'xl'})).toEqual({
      'data-gap': 'sm',
      'data-gap-md': 'md',
      'data-gap-lg': 'xl',
    })
  })

  it('handles responsive object without base', () => {
    expect(responsiveDataAttrs('direction', {md: 'horizontal'})).toEqual({
      'data-direction-md': 'horizontal',
    })
  })

  it('handles all breakpoints', () => {
    const result = responsiveDataAttrs('gap', {
      base: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
    })
    expect(result).toEqual({
      'data-gap': 'xs',
      'data-gap-sm': 'sm',
      'data-gap-md': 'md',
      'data-gap-lg': 'lg',
      'data-gap-xl': 'xl',
    })
  })
})

describe('responsiveStyles', () => {
  it('returns empty object for undefined', () => {
    expect(responsiveStyles('grid-columns', undefined)).toEqual({})
  })

  it('handles static value without transform', () => {
    expect(responsiveStyles('col-span', 'span 6')).toEqual({
      '--col-span': 'span 6',
    })
  })

  it('handles static value with transform', () => {
    expect(
      responsiveStyles('grid-columns', 3, (v) => `repeat(${v}, 1fr)`),
    ).toEqual({
      '--grid-columns': 'repeat(3, 1fr)',
    })
  })

  it('handles responsive object with transform', () => {
    const result = responsiveStyles(
      'grid-columns',
      {base: 1, md: 2, lg: 3},
      (v) => `repeat(${v}, 1fr)`,
    )
    expect(result).toEqual({
      '--grid-columns': 'repeat(1, 1fr)',
      '--grid-columns-md': 'repeat(2, 1fr)',
      '--grid-columns-lg': 'repeat(3, 1fr)',
    })
  })

  it('handles responsive object without base', () => {
    const result = responsiveStyles('col-span', {md: 'span 6', lg: 'span 4'})
    expect(result).toEqual({
      '--col-span-md': 'span 6',
      '--col-span-lg': 'span 4',
    })
  })
})

describe('hasResponsiveOverrides', () => {
  it('returns false for undefined', () => {
    expect(hasResponsiveOverrides(undefined)).toBe(false)
  })

  it('returns false for static value', () => {
    expect(hasResponsiveOverrides('md')).toBe(false)
  })

  it('returns false for base-only object', () => {
    expect(hasResponsiveOverrides({base: 'md'})).toBe(false)
  })

  it('returns true for object with breakpoint keys', () => {
    expect(hasResponsiveOverrides({base: 'sm', md: 'lg'})).toBe(true)
  })

  it('returns true for object with only breakpoint keys', () => {
    expect(hasResponsiveOverrides({lg: 'xl'})).toBe(true)
  })
})
