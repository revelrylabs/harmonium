import * as React from 'react'
import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import {Breadcrumbs, BreadcrumbItem} from './Breadcrumbs'

describe('Breadcrumbs', () => {
  it('renders with navigation role', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem active>Page</BreadcrumbItem>
      </Breadcrumbs>,
    )
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb')
  })

  it('renders items with separators', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem active>Detail</BreadcrumbItem>
      </Breadcrumbs>,
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Detail')).toBeInTheDocument()
    // Two separators for three items
    expect(screen.getAllByText('/')).toHaveLength(2)
  })

  it('marks active item with aria-current', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem active>Current</BreadcrumbItem>
      </Breadcrumbs>,
    )
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page')
  })

  it('renders active item as span, not link', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem active>Current</BreadcrumbItem>
      </Breadcrumbs>,
    )
    expect(screen.getByText('Current').tagName).toBe('SPAN')
  })

  it('supports custom separator', () => {
    render(
      <Breadcrumbs separator="›">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem active>Page</BreadcrumbItem>
      </Breadcrumbs>,
    )
    expect(screen.getByText('›')).toBeInTheDocument()
  })

  it('forwards ref and props on the active item', async () => {
    const user = userEvent.setup()
    const ref = React.createRef<HTMLAnchorElement | HTMLSpanElement>()
    const onClick = vi.fn()
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem
          active
          ref={ref}
          id="current"
          data-testid="current"
          href="/ignored"
          onClick={onClick}
        >
          Page
        </BreadcrumbItem>
      </Breadcrumbs>,
    )
    const current = screen.getByTestId('current')
    expect(ref.current).toBe(current)
    expect(current.tagName).toBe('SPAN')
    expect(current).toHaveAttribute('id', 'current')
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(current).not.toHaveAttribute('href')
    await user.click(current)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/settings">Settings</BreadcrumbItem>
        <BreadcrumbItem active>Profile</BreadcrumbItem>
      </Breadcrumbs>,
    )
    expect(
      await axe(container, {rules: {'color-contrast': {enabled: false}}}),
    ).toHaveNoViolations()
  })
})
