import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {TopBar, TopBarSection} from './TopBar'

describe('TopBar', () => {
  it('renders as header element', () => {
    render(<TopBar data-testid="topbar">Nav</TopBar>)
    expect(screen.getByTestId('topbar').tagName).toBe('HEADER')
  })

  it('renders children', () => {
    render(<TopBar>Logo</TopBar>)
    expect(screen.getByText('Logo')).toBeInTheDocument()
  })

  it('applies fixed attribute', () => {
    render(<TopBar data-testid="topbar" fixed>Nav</TopBar>)
    expect(screen.getByTestId('topbar')).toHaveAttribute('data-fixed')
  })

  it('renders sections with alignment', () => {
    render(
      <TopBar>
        <TopBarSection data-testid="left" align="left">Logo</TopBarSection>
        <TopBarSection data-testid="right" align="right">Menu</TopBarSection>
      </TopBar>,
    )
    expect(screen.getByTestId('left')).toHaveAttribute('data-align', 'left')
    expect(screen.getByTestId('right')).toHaveAttribute('data-align', 'right')
  })
})
