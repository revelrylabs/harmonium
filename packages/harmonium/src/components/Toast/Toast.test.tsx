import {describe, it, expect, vi, afterEach} from 'vitest'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ToastProvider, useToast} from './Toast'

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

  it('applies variant', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestTrigger />
      </ToastProvider>,
    )
    await user.click(screen.getByText('Show Toast'))
    expect(screen.getByRole('status')).toHaveAttribute('data-variant', 'success')
  })
})
