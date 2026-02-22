import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
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
})
