import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import {
  AppShell,
  AppShellHeader,
  AppShellSidebar,
  AppShellMain,
  AppShellFooter,
} from './AppShell'

describe('AppShell', () => {
  it('renders children', () => {
    render(<AppShell data-testid="shell">Content</AppShell>)
    expect(screen.getByTestId('shell')).toHaveTextContent('Content')
  })

  it('applies sidebarCollapsed data attribute', () => {
    render(<AppShell data-testid="shell" sidebarCollapsed>Content</AppShell>)
    expect(screen.getByTestId('shell')).toHaveAttribute(
      'data-sidebar-collapsed',
    )
  })

  it('does not set data-sidebar-collapsed when false', () => {
    render(<AppShell data-testid="shell">Content</AppShell>)
    expect(screen.getByTestId('shell')).not.toHaveAttribute(
      'data-sidebar-collapsed',
    )
  })

  it('merges custom className', () => {
    render(
      <AppShell data-testid="shell" className="custom">
        Content
      </AppShell>,
    )
    expect(screen.getByTestId('shell')).toHaveClass('custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn<(el: HTMLDivElement | null) => void>()
    render(<AppShell ref={ref}>Content</AppShell>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })
})

describe('AppShell sections', () => {
  it('renders all sections with correct semantic elements', () => {
    render(
      <AppShell>
        <AppShellHeader data-testid="header">Header</AppShellHeader>
        <AppShellSidebar data-testid="sidebar">Sidebar</AppShellSidebar>
        <AppShellMain data-testid="main">Main</AppShellMain>
        <AppShellFooter data-testid="footer">Footer</AppShellFooter>
      </AppShell>,
    )
    expect(screen.getByTestId('header').tagName).toBe('HEADER')
    expect(screen.getByTestId('sidebar').tagName).toBe('ASIDE')
    expect(screen.getByTestId('main').tagName).toBe('MAIN')
    expect(screen.getByTestId('footer').tagName).toBe('FOOTER')
  })

  it('renders content within sections', () => {
    render(
      <AppShell>
        <AppShellHeader>My Header</AppShellHeader>
        <AppShellMain>My Content</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByText('My Header')).toBeInTheDocument()
    expect(screen.getByText('My Content')).toBeInTheDocument()
  })
})
