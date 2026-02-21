import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Grid, GridCol} from './Grid'

describe('Grid', () => {
  it('renders children', () => {
    render(<Grid data-testid="grid"><div>Cell</div></Grid>)
    expect(screen.getByTestId('grid')).toBeInTheDocument()
    expect(screen.getByText('Cell')).toBeInTheDocument()
  })

  it('sets grid columns via CSS variable', () => {
    render(<Grid data-testid="grid" columns={3}>Content</Grid>)
    const el = screen.getByTestId('grid')
    expect(el.style.getPropertyValue('--grid-columns')).toBe('repeat(3, 1fr)')
  })

  it('accepts string column template', () => {
    render(<Grid data-testid="grid" columns="1fr 2fr 1fr">Content</Grid>)
    const el = screen.getByTestId('grid')
    expect(el.style.getPropertyValue('--grid-columns')).toBe('1fr 2fr 1fr')
  })

  it('applies gap', () => {
    render(<Grid data-testid="grid" gap="lg">Content</Grid>)
    expect(screen.getByTestId('grid')).toHaveAttribute('data-gap', 'lg')
  })
})

describe('GridCol', () => {
  it('renders children', () => {
    render(<GridCol data-testid="col">Content</GridCol>)
    expect(screen.getByTestId('col')).toBeInTheDocument()
  })

  it('sets column span via CSS variable', () => {
    render(<GridCol data-testid="col" span={6}>Content</GridCol>)
    const el = screen.getByTestId('col')
    expect(el.style.getPropertyValue('--col-span')).toBe('span 6')
  })

  it('accepts string span', () => {
    render(<GridCol data-testid="col" span="1 / -1">Content</GridCol>)
    const el = screen.getByTestId('col')
    expect(el.style.getPropertyValue('--col-span')).toBe('1 / -1')
  })
})
