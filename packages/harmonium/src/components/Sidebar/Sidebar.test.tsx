import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Sidebar, SidebarSection, SidebarItem} from './Sidebar'

describe('Sidebar', () => {
  it('renders as nav element', () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>)
    const el = screen.getByTestId('sidebar')
    expect(el.tagName).toBe('NAV')
  })

  it('defaults to md width', () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>)
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-width', 'md')
  })

  it('applies collapsed data attribute', () => {
    render(<Sidebar data-testid="sidebar" collapsed>Content</Sidebar>)
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-collapsed')
  })

  it('does not set data-collapsed when false', () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>)
    expect(screen.getByTestId('sidebar')).not.toHaveAttribute('data-collapsed')
  })

  it('applies width data attribute', () => {
    render(<Sidebar data-testid="sidebar" width="lg">Content</Sidebar>)
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-width', 'lg')
  })

  it('forwards ref', () => {
    const ref = vi.fn<(el: HTMLElement | null) => void>()
    render(<Sidebar ref={ref}>Content</Sidebar>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })
})

describe('SidebarSection', () => {
  it('renders children', () => {
    render(<SidebarSection data-testid="section">Items</SidebarSection>)
    expect(screen.getByTestId('section')).toHaveTextContent('Items')
  })

  it('renders label when provided', () => {
    render(<SidebarSection label="Navigation">Items</SidebarSection>)
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })
})

describe('SidebarItem', () => {
  it('renders as button', () => {
    render(<SidebarItem>Dashboard</SidebarItem>)
    expect(screen.getByRole('button', {name: 'Dashboard'})).toBeInTheDocument()
  })

  it('applies active data attribute', () => {
    render(<SidebarItem data-testid="item" active>Dashboard</SidebarItem>)
    expect(screen.getByTestId('item')).toHaveAttribute('data-active')
  })

  it('renders icon when provided', () => {
    render(
      <SidebarItem icon={<span data-testid="icon">I</span>}>
        Dashboard
      </SidebarItem>,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<SidebarItem onClick={onClick}>Dashboard</SidebarItem>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
