import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ToggleGroup, ToggleGroupItem} from './ToggleGroup'

describe('ToggleGroup', () => {
  it('renders items', () => {
    render(
      <ToggleGroup defaultValue="list">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('radio', {name: 'List'})).toBeInTheDocument()
    expect(screen.getByRole('radio', {name: 'Grid'})).toBeInTheDocument()
  })

  it('marks the default value as active', () => {
    render(
      <ToggleGroup defaultValue="list">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('radio', {name: 'List'})).toHaveAttribute(
      'data-state',
      'active',
    )
    expect(screen.getByRole('radio', {name: 'Grid'})).toHaveAttribute(
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
    await user.click(screen.getByRole('radio', {name: 'Grid'}))
    expect(screen.getByRole('radio', {name: 'Grid'})).toHaveAttribute(
      'data-state',
      'active',
    )
    expect(screen.getByRole('radio', {name: 'List'})).toHaveAttribute(
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
    await user.click(screen.getByRole('radio', {name: 'Grid'}))
    expect(onValueChange).toHaveBeenCalledWith('grid')
  })

  it('works in controlled mode', () => {
    render(
      <ToggleGroup value="grid">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('radio', {name: 'Grid'})).toHaveAttribute(
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

  it('has radiogroup role', () => {
    render(
      <ToggleGroup defaultValue="a">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('sets aria-checked on active item', () => {
    render(
      <ToggleGroup defaultValue="a">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('radio', {name: 'A'})).toHaveAttribute(
      'aria-checked',
      'true',
    )
    expect(screen.getByRole('radio', {name: 'B'})).toHaveAttribute(
      'aria-checked',
      'false',
    )
  })
})
