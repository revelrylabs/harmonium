import * as React from 'react'
import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
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

describe('SidebarItem accessibility', () => {
  it('marks the active item with aria-current="page"', () => {
    render(
      <Sidebar aria-label="Main">
        <SidebarItem active>Dashboard</SidebarItem>
        <SidebarItem>Settings</SidebarItem>
      </Sidebar>,
    )
    expect(screen.getByRole('button', {name: 'Dashboard'})).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('button', {name: 'Settings'})).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('renders a link when href is set', () => {
    render(
      <SidebarItem href="/settings" active>
        Settings
      </SidebarItem>,
    )
    const link = screen.getByRole('link', {name: 'Settings'})
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/settings')
    expect(link).toHaveAttribute('aria-current', 'page')
    expect(link).not.toHaveAttribute('type')
    expect(link).toHaveClass('item')
    expect(link).toHaveAttribute('data-active')
  })

  it('renders a custom element via render, merging props and handlers', async () => {
    const user = userEvent.setup()
    // jsdom can't navigate, so stop the link's default action
    const onItemClick = vi.fn((event: React.MouseEvent) => event.preventDefault())
    const onLinkClick = vi.fn()
    const RouterLink = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement> & {to: string}
    >(({to, ...props}, ref) => <a ref={ref} href={to} {...props} />)
    RouterLink.displayName = 'RouterLink'
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>()
    render(
      <SidebarItem
        ref={ref}
        active
        className="custom"
        onClick={onItemClick}
        render={<RouterLink to="/reports" onClick={onLinkClick} />}
      >
        Reports
      </SidebarItem>,
    )
    const link = screen.getByRole('link', {name: 'Reports'})
    expect(link).toHaveAttribute('href', '/reports')
    expect(link).toHaveAttribute('aria-current', 'page')
    expect(link).toHaveClass('item', 'custom')
    expect(ref.current).toBe(link)
    await user.click(link)
    expect(onItemClick).toHaveBeenCalledOnce()
    expect(onLinkClick).toHaveBeenCalledOnce()
  })

  it('names items from their label when the sidebar is collapsed', () => {
    render(
      <Sidebar collapsed aria-label="Main">
        <SidebarItem icon={<svg />}>
          <strong>Dash</strong>board
        </SidebarItem>
        <SidebarItem href="/settings" icon={<svg />} aria-label="App settings">
          Settings
        </SidebarItem>
      </Sidebar>,
    )
    const item = screen.getByRole('button', {name: 'Dashboard'})
    expect(item).toHaveAttribute('aria-label', 'Dashboard')
    expect(item).toHaveAttribute('title', 'Dashboard')
    // An explicit consumer label wins
    expect(screen.getByRole('link', {name: 'App settings'})).toBeInTheDocument()
  })

  it('does not add aria-label when expanded', () => {
    render(
      <Sidebar>
        <SidebarItem>Dashboard</SidebarItem>
      </Sidebar>,
    )
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-label')
  })

  it('passes disabled and type through to the button', () => {
    render(
      <SidebarItem disabled type="submit">
        Save
      </SidebarItem>,
    )
    const button = screen.getByRole('button', {name: 'Save'})
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('marks a disabled link with aria-disabled and drops its href', () => {
    render(
      <SidebarItem href="/billing" disabled>
        Billing
      </SidebarItem>,
    )
    const link = screen.getByText('Billing').closest('a')
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).not.toHaveAttribute('href')
  })

  it('takes a disabled router link out of the tab order and cancels activation', async () => {
    const user = userEvent.setup()
    const RouterLink = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement> & {to: string}
    >(({to, ...props}, ref) => <a ref={ref} href={to} {...props} />)
    RouterLink.displayName = 'RouterLink'
    render(
      <SidebarItem disabled render={<RouterLink to="/reports" />}>
        Reports
      </SidebarItem>,
    )
    const link = screen.getByRole('link', {name: 'Reports'})
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('tabindex', '-1')

    const click = new MouseEvent('click', {bubbles: true, cancelable: true})
    link.dispatchEvent(click)
    expect(click.defaultPrevented).toBe(true)

    const enter = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true,
    })
    link.dispatchEvent(enter)
    expect(enter.defaultPrevented).toBe(true)

    await user.tab()
    expect(link).not.toHaveFocus()
  })

  it('names a labelled section as a group', () => {
    render(
      <Sidebar aria-label="Main">
        <SidebarSection label="Workspace">
          <SidebarItem>Dashboard</SidebarItem>
        </SidebarSection>
      </Sidebar>,
    )
    expect(screen.getByRole('group', {name: 'Workspace'})).toBeInTheDocument()
  })

  it('has no axe violations (expanded and collapsed)', async () => {
    const {container, rerender} = render(
      <Sidebar aria-label="Main">
        <SidebarSection label="Workspace">
          <SidebarItem href="/" active icon={<svg />}>
            Dashboard
          </SidebarItem>
          <SidebarItem icon={<svg />}>Reports</SidebarItem>
        </SidebarSection>
      </Sidebar>,
    )
    const options = {rules: {'color-contrast': {enabled: false}}}
    expect(await axe(container, options)).toHaveNoViolations()
    rerender(
      <Sidebar aria-label="Main" collapsed>
        <SidebarSection label="Workspace">
          <SidebarItem href="/" active icon={<svg />}>
            Dashboard
          </SidebarItem>
          <SidebarItem icon={<svg />}>Reports</SidebarItem>
        </SidebarSection>
      </Sidebar>,
    )
    expect(await axe(container, options)).toHaveNoViolations()
  })
})

describe('SidebarItem types', () => {
  it('accepts button and link attributes', () => {
    // Type-level checks: these would fail `tsc` if the props regressed.
    const button = <SidebarItem disabled type="submit" form="f" />
    const link = <SidebarItem href="/x" target="_blank" rel="noreferrer" />
    // @ts-expect-error: `active` is a boolean
    const bad = <SidebarItem active="yes" />
    expect([button, link, bad]).toHaveLength(3)
  })
})
