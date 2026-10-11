import {describe, it, expect, beforeAll} from 'vitest'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import {Tooltip} from './Tooltip'
import {Button} from '../Button'

beforeAll(() => {
  // jsdom reports a 0x0 viewport, which makes Base UI flip every popup to
  // the opposite side. Give it a real size.
  Object.defineProperty(document.documentElement, 'clientWidth', {value: 1024, configurable: true})
  Object.defineProperty(document.documentElement, 'clientHeight', {value: 768, configurable: true})
})

describe('Tooltip', () => {
  it('does not show tooltip by default', () => {
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>)
    await user.hover(screen.getByText('Hover me'))
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help text')
  })

  it('hides tooltip on unhover', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>)
    await user.hover(screen.getByText('Hover me'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    await user.unhover(screen.getByText('Hover me'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('applies side data attribute', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Help" side="bottom"><button>Hover</button></Tooltip>)
    await user.hover(screen.getByText('Hover'))
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-side', 'bottom')
  })

  it('describes the focusable trigger, not a wrapper', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Saves your changes">
        <Button>Save</Button>
      </Tooltip>,
    )
    await user.tab()
    const trigger = screen.getByRole('button', {name: 'Save'})
    expect(trigger).toHaveFocus()
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(trigger).toHaveAccessibleDescription('Saves your changes')
  })

  it('keeps an existing aria-describedby on the child', async () => {
    const user = userEvent.setup()
    render(
      <>
        <p id="hint">Ctrl+S</p>
        <Tooltip content="Saves your changes">
          <Button aria-describedby="hint">Save</Button>
        </Tooltip>
      </>,
    )
    const trigger = screen.getByRole('button', {name: 'Save'})
    expect(trigger).toHaveAccessibleDescription('Ctrl+S')
    await user.hover(trigger)
    expect(trigger).toHaveAccessibleDescription('Ctrl+S Saves your changes')
  })

  it('stays open while the trigger is focused', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>)
    await user.tab()
    await user.hover(screen.getByText('Hover me'))
    await user.unhover(screen.getByText('Hover me'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>)
    await user.tab()
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <Tooltip content="Saves your changes">
        <Button>Save</Button>
      </Tooltip>,
    )
    await user.tab()
    // Let the open transition settle so axe sees the final DOM.
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-starting-style'),
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
