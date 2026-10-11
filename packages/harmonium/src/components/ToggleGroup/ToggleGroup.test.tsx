import {describe, it, expect, vi} from 'vitest'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {configureAxe} from 'vitest-axe'
import * as axeMatchers from 'vitest-axe/matchers'
import {ToggleGroup, ToggleGroupItem} from './ToggleGroup'

expect.extend(axeMatchers)

// Base UI dispatches a PointerEvent click when Space activates a composite
// item; jsdom does not implement PointerEvent.
if (typeof window.PointerEvent === 'undefined') {
  window.PointerEvent = MouseEvent as typeof PointerEvent
}

// jsdom has no canvas, so axe cannot compute colour contrast here
const axe = configureAxe({rules: {'color-contrast': {enabled: false}}})

function renderViews(props: Record<string, unknown> = {}) {
  return render(
    <ToggleGroup defaultValue="list" aria-label="View" {...props}>
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="board">Board</ToggleGroupItem>
    </ToggleGroup>,
  )
}

describe('ToggleGroup', () => {
  it('renders items', () => {
    render(
      <ToggleGroup defaultValue="list">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('button', {name: 'List'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Grid'})).toBeInTheDocument()
  })

  it('marks the default value as active', () => {
    render(
      <ToggleGroup defaultValue="list">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('button', {name: 'List'})).toHaveAttribute(
      'data-state',
      'active',
    )
    expect(screen.getByRole('button', {name: 'Grid'})).toHaveAttribute(
      'data-state',
      'inactive',
    )
  })

  it('switches active item on click (uncontrolled)', async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup defaultValue="list">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    )
    await user.click(screen.getByRole('button', {name: 'Grid'}))
    expect(screen.getByRole('button', {name: 'Grid'})).toHaveAttribute(
      'data-state',
      'active',
    )
    expect(screen.getByRole('button', {name: 'List'})).toHaveAttribute(
      'data-state',
      'inactive',
    )
  })

  it('calls onValueChange when item is clicked', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <ToggleGroup defaultValue="list" onValueChange={onValueChange}>
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    )
    await user.click(screen.getByRole('button', {name: 'Grid'}))
    expect(onValueChange).toHaveBeenCalledWith('grid')
  })

  it('works in controlled mode', () => {
    render(
      <ToggleGroup value="grid">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('button', {name: 'Grid'})).toHaveAttribute(
      'data-state',
      'active',
    )
  })

  it('defaults to md size', () => {
    render(
      <ToggleGroup data-testid="group" defaultValue="a">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByTestId('group')).toHaveAttribute('data-size', 'md')
  })

  it('applies size data attribute', () => {
    render(
      <ToggleGroup data-testid="group" defaultValue="a" size="sm">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByTestId('group')).toHaveAttribute('data-size', 'sm')
  })

  it('has group role', () => {
    render(
      <ToggleGroup defaultValue="a" aria-label="View">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('group', {name: 'View'})).toBeInTheDocument()
  })

  it('sets aria-pressed on active item', () => {
    render(
      <ToggleGroup defaultValue="a">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('button', {name: 'A'})).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', {name: 'B'})).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('keeps the selected item pressed when it is clicked again', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderViews({onValueChange})
    await user.click(screen.getByRole('button', {name: 'List'}))
    expect(screen.getByRole('button', {name: 'List'})).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('is a single tab stop', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <ToggleGroup defaultValue="grid" aria-label="View">
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        </ToggleGroup>
        <button type="button">After</button>
      </>,
    )
    await user.click(screen.getByText('Before'))
    await user.tab()
    expect(screen.getByRole('button', {name: 'List'})).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', {name: 'After'})).toHaveFocus()
  })

  it('moves focus with arrow keys, Home and End and selects with Enter/Space', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderViews({onValueChange})
    await user.tab()
    expect(screen.getByRole('button', {name: 'List'})).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('button', {name: 'Grid'})).toHaveFocus()
    await user.keyboard('{End}')
    expect(screen.getByRole('button', {name: 'Board'})).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('button', {name: 'List'})).toHaveFocus()
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('button', {name: 'Board'})).toHaveFocus()
    await user.keyboard('{Home}{ArrowRight}')
    expect(screen.getByRole('button', {name: 'Grid'})).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onValueChange).toHaveBeenLastCalledWith('grid')
    expect(screen.getByRole('button', {name: 'Grid'})).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await user.keyboard('{ArrowRight}[Space]')
    expect(onValueChange).toHaveBeenLastCalledWith('board')
    expect(screen.getByRole('button', {name: 'Grid'})).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('does not change in controlled mode until the parent updates value', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderViews({value: 'list', defaultValue: undefined, onValueChange})
    await user.click(screen.getByRole('button', {name: 'Grid'}))
    expect(onValueChange).toHaveBeenCalledWith('grid')
    expect(screen.getByRole('button', {name: 'List'})).toHaveAttribute(
      'data-state',
      'active',
    )
  })

  it('still selects when the consumer passes onClick (#685)', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <ToggleGroup defaultValue="list">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid" onClick={onClick}>
          Grid
        </ToggleGroupItem>
      </ToggleGroup>,
    )
    await user.click(screen.getByRole('button', {name: 'Grid'}))
    expect(onClick).toHaveBeenCalledOnce()
    expect(screen.getByRole('button', {name: 'Grid'})).toHaveAttribute(
      'data-state',
      'active',
    )
  })

  it('has no axe violations', async () => {
    const {container} = renderViews()
    // Base UI may update after mount (e.g. once it has measured the DOM)
    const results = await act(() => axe(container))
    expect(results).toHaveNoViolations()
  })
})
