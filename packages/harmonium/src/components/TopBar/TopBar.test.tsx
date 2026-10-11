import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {axe} from 'vitest-axe'
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

describe('TopBar accessibility', () => {
  it('has no axe violations', async () => {
    const {container} = render(
      <TopBar fixed>
        <TopBarSection align="left">Logo</TopBarSection>
        <TopBarSection align="right">
          <nav aria-label="Account">
            <a href="/profile">Profile</a>
          </nav>
        </TopBarSection>
      </TopBar>,
    )
    expect(
      await axe(container, {rules: {'color-contrast': {enabled: false}}}),
    ).toHaveNoViolations()
  })
})
