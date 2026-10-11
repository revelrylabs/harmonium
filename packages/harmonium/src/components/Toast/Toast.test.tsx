import {describe, it, expect, vi, afterEach} from 'vitest'
import * as React from 'react'
import {render, screen, act, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {configureAxe} from 'vitest-axe'
import * as axeMatchers from 'vitest-axe/matchers'
import {ToastProvider, useToast} from './Toast'

expect.extend(axeMatchers)

// jsdom has no canvas, so axe cannot compute colour contrast here
const axe = configureAxe({rules: {'color-contrast': {enabled: false}}})

function TestTrigger() {
  const {toast} = useToast()
  return (
    <button onClick={() => toast({message: 'Hello', variant: 'success', duration: 0})}>
      Show Toast
    </button>
  )
}

describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows toast on trigger', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestTrigger />
      </ToastProvider>,
    )
    await user.click(screen.getByText('Show Toast'))
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('dismisses on close button click', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestTrigger />
      </ToastProvider>,
    )
    await user.click(screen.getByText('Show Toast'))
    expect(screen.getByText('Hello')).toBeInTheDocument()
    await user.click(screen.getByLabelText('Dismiss'))
    expect(screen.queryByText('Hello')).not.toBeInTheDocument()
  })

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers()

    function AutoTrigger() {
      const {toast} = useToast()
      return (
        <button onClick={() => toast({message: 'Auto', duration: 100})}>
          Show Auto
        </button>
      )
    }

    render(
      <ToastProvider>
        <AutoTrigger />
      </ToastProvider>,
    )

    act(() => {
      screen.getByText('Show Auto').click()
    })
    expect(screen.getByText('Auto')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(screen.queryByText('Auto')).not.toBeInTheDocument()
  })

  it('keeps a toast with a non-finite duration open', () => {
    vi.useFakeTimers()

    function PersistentTrigger() {
      const {toast} = useToast()
      return (
        <button onClick={() => toast({message: 'Sticky', duration: Infinity})}>
          Show Sticky
        </button>
      )
    }

    render(
      <ToastProvider>
        <PersistentTrigger />
      </ToastProvider>,
    )

    act(() => {
      screen.getByText('Show Sticky').click()
    })
    act(() => {
      vi.advanceTimersByTime(60_000)
    })
    expect(screen.getByText('Sticky')).toBeInTheDocument()
  })

  it('applies variant', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestTrigger />
      </ToastProvider>,
    )
    await user.click(screen.getByText('Show Toast'))
    // Toasts are no longer individual `role="status"` elements: they are
    // announced by the provider's persistent live region (see below).
    expect(screen.getByText('Hello').closest('.toast')).toHaveAttribute(
      'data-variant',
      'success',
    )
  })

  it('renders a persistent live region before any toast is shown', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestTrigger />
      </ToastProvider>,
    )
    const region = screen.getByRole('region', {name: 'Notifications'})
    expect(region).toHaveAttribute('aria-live', 'polite')
    await user.click(screen.getByText('Show Toast'))
    // The toast is appended into the existing live region, so it is announced
    expect(region).toContainElement(screen.getByText('Hello'))
    expect(screen.getByRole('dialog', {name: 'Hello'})).toBeInTheDocument()
  })

  it('announces error toasts through role="alert"', async () => {
    const user = userEvent.setup()
    function ErrorTrigger() {
      const {toast} = useToast()
      return (
        <button onClick={() => toast({message: 'Save failed', variant: 'error', duration: 0})}>
          Fail
        </button>
      )
    }
    render(
      <ToastProvider>
        <ErrorTrigger />
      </ToastProvider>,
    )
    await user.click(screen.getByText('Fail'))
    expect(screen.getByRole('alert')).toHaveTextContent('Save failed')
  })

  it('applies the position to the viewport', () => {
    render(
      <ToastProvider position="top-left">
        <TestTrigger />
      </ToastProvider>,
    )
    expect(screen.getByRole('region', {name: 'Notifications'})).toHaveAttribute(
      'data-position',
      'top-left',
    )
  })

  it('stacks the newest toast last', async () => {
    const user = userEvent.setup()
    let n = 0
    function CountTrigger() {
      const {toast} = useToast()
      return <button onClick={() => toast({message: `Toast ${++n}`, duration: 0})}>Add</button>
    }
    render(
      <ToastProvider>
        <CountTrigger />
      </ToastProvider>,
    )
    await user.click(screen.getByText('Add'))
    await user.click(screen.getByText('Add'))
    const messages = screen
      .getByRole('region', {name: 'Notifications'})
      .querySelectorAll('.message')
    expect(Array.from(messages, (m) => m.textContent)).toEqual(['Toast 1', 'Toast 2'])
  })

  it('dismisses programmatically with the returned id', async () => {
    const user = userEvent.setup()
    function DismissTrigger() {
      const {toast, dismiss} = useToast()
      const idRef = React.useRef('')
      return (
        <>
          <button onClick={() => (idRef.current = toast({message: 'Bye', duration: 0}))}>
            Show
          </button>
          <button onClick={() => dismiss(idRef.current)}>Hide</button>
        </>
      )
    }
    render(
      <ToastProvider>
        <DismissTrigger />
      </ToastProvider>,
    )
    await user.click(screen.getByText('Show'))
    expect(screen.getByText('Bye')).toBeInTheDocument()
    await user.click(screen.getByText('Hide'))
    expect(screen.queryByText('Bye')).not.toBeInTheDocument()
  })

  it('pauses auto-dismiss while the pointer is over the toasts', () => {
    vi.useFakeTimers()
    function AutoTrigger() {
      const {toast} = useToast()
      return <button onClick={() => toast({message: 'Paused', duration: 100})}>Show</button>
    }
    render(
      <ToastProvider>
        <AutoTrigger />
      </ToastProvider>,
    )
    act(() => {
      screen.getByText('Show').click()
    })
    const region = screen.getByRole('region', {name: 'Notifications'})
    fireEvent.mouseEnter(region)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(screen.getByText('Paused')).toBeInTheDocument()
    fireEvent.mouseLeave(region)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(screen.queryByText('Paused')).not.toBeInTheDocument()
  })

  it('throws when useToast is used outside ToastProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestTrigger />)).toThrow('useToast must be used within <ToastProvider>')
    spy.mockRestore()
  })

  it('has no axe violations', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestTrigger />
      </ToastProvider>,
    )
    await user.click(screen.getByText('Show Toast'))
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
