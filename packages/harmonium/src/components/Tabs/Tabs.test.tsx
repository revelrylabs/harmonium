import {describe, it, expect, vi} from 'vitest'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {configureAxe} from 'vitest-axe'
import * as axeMatchers from 'vitest-axe/matchers'
import {Tabs, TabsList, TabsTrigger, TabsContent} from './Tabs'

expect.extend(axeMatchers)

// jsdom has no canvas, so axe cannot compute colour contrast here
const axe = configureAxe({rules: {'color-contrast': {enabled: false}}})

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

  it('selects the first tab when no defaultValue is given', () => {
    const onChange = vi.fn()
    renderTabs({defaultValue: undefined, onValueChange: onChange})
    expect(screen.getByRole('tab', {name: 'Tab 1'})).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    // The automatic initial selection is not reported as a change
    expect(onChange).not.toHaveBeenCalled()
  })

  it('keeps the data-state styling hook', async () => {
    const user = userEvent.setup()
    renderTabs()
    const [one, two] = screen.getAllByRole('tab')
    expect(one).toHaveAttribute('data-state', 'active')
    expect(two).toHaveAttribute('data-state', 'inactive')
    await user.click(two)
    expect(one).toHaveAttribute('data-state', 'inactive')
    expect(two).toHaveAttribute('data-state', 'active')
  })

  it('wires tabs to panels with aria-controls / aria-labelledby', () => {
    renderTabs()
    const tab = screen.getByRole('tab', {name: 'Tab 1'})
    const panel = screen.getByRole('tabpanel')
    expect(tab).toHaveAttribute('aria-controls', panel.id)
    expect(panel).toHaveAttribute('aria-labelledby', tab.id)
    expect(panel).toHaveAccessibleName('Tab 1')
  })

  it('uses a roving tabindex so the tab list is a single tab stop', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <Tabs defaultValue="two">
          <TabsList>
            <TabsTrigger value="one">Tab 1</TabsTrigger>
            <TabsTrigger value="two">Tab 2</TabsTrigger>
            <TabsTrigger value="three">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </>,
    )
    expect(screen.getByRole('tab', {name: 'Tab 1'})).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('tab', {name: 'Tab 2'})).toHaveAttribute('tabindex', '0')
    await user.click(screen.getByText('Before'))
    await user.tab()
    expect(screen.getByRole('tab', {name: 'Tab 2'})).toHaveFocus()
  })

  it('moves focus with arrow keys, Home and End', async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">Tab 1</TabsTrigger>
          <TabsTrigger value="two">Tab 2</TabsTrigger>
          <TabsTrigger value="three">Tab 3</TabsTrigger>
        </TabsList>
      </Tabs>,
    )
    await user.click(screen.getByRole('tab', {name: 'Tab 1'}))
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', {name: 'Tab 2'})).toHaveFocus()
    await user.keyboard('{End}')
    expect(screen.getByRole('tab', {name: 'Tab 3'})).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', {name: 'Tab 1'})).toHaveFocus()
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', {name: 'Tab 3'})).toHaveFocus()
    await user.keyboard('{Home}')
    expect(screen.getByRole('tab', {name: 'Tab 1'})).toHaveFocus()
  })

  it('activates the focused tab with Enter', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderTabs({onValueChange: onChange})
    await user.click(screen.getByRole('tab', {name: 'Tab 1'}))
    await user.keyboard('{ArrowRight}{Enter}')
    expect(onChange).toHaveBeenCalledWith('two')
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('still activates the tab when the consumer passes onClick (#685)', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">Tab 1</TabsTrigger>
          <TabsTrigger value="two" onClick={onClick}>
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one">Content 1</TabsContent>
        <TabsContent value="two">Content 2</TabsContent>
      </Tabs>,
    )
    await user.click(screen.getByText('Tab 2'))
    expect(onClick).toHaveBeenCalledOnce()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('merges consumer className last', () => {
    render(
      <Tabs defaultValue="one" className="custom-root">
        <TabsList className="custom-list">
          <TabsTrigger value="one" className="custom-trigger">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one" className="custom-content">
          Content 1
        </TabsContent>
      </Tabs>,
    )
    expect(screen.getByRole('tablist')).toHaveClass('list', 'custom-list')
    expect(screen.getByRole('tab')).toHaveClass('trigger', 'custom-trigger')
    expect(screen.getByRole('tabpanel')).toHaveClass('content', 'custom-content')
  })

  it('has no axe violations', async () => {
    const {container} = renderTabs()
    // Base UI may update after mount (e.g. once it has measured the DOM)
    const results = await act(() => axe(container))
    expect(results).toHaveNoViolations()
  })
})
