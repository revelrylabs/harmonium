import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Tabs, TabsList, TabsTrigger, TabsContent} from './Tabs'

function renderTabs(props: Record<string, unknown> = {}) {
  return render(
    <Tabs defaultValue="one" {...props}>
      <TabsList>
        <TabsTrigger value="one">Tab 1</TabsTrigger>
        <TabsTrigger value="two">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Content 1</TabsContent>
      <TabsContent value="two">Content 2</TabsContent>
    </Tabs>,
  )
}

describe('Tabs', () => {
  it('renders the default active tab content', () => {
    renderTabs()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('switches tabs on click', async () => {
    const user = userEvent.setup()
    renderTabs()
    await user.click(screen.getByText('Tab 2'))
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('marks active trigger with aria-selected', () => {
    renderTabs()
    expect(screen.getByText('Tab 1')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onValueChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderTabs({onValueChange: onChange})
    await user.click(screen.getByText('Tab 2'))
    expect(onChange).toHaveBeenCalledWith('two')
  })

  it('supports controlled mode', () => {
    render(
      <Tabs value="two">
        <TabsList>
          <TabsTrigger value="one">Tab 1</TabsTrigger>
          <TabsTrigger value="two">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Content 1</TabsContent>
        <TabsContent value="two">Content 2</TabsContent>
      </Tabs>,
    )
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })
})
