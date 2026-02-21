import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Alert} from './Alert'

describe('Alert', () => {
  it('renders with alert role', () => {
    render(<Alert>Message</Alert>)
    expect(screen.getByRole('alert')).toHaveTextContent('Message')
  })

  it('defaults to info variant', () => {
    render(<Alert data-testid="alert">Info</Alert>)
    expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'info')
  })

  it('renders dismiss button when dismissible', () => {
    render(<Alert dismissible>Dismissible</Alert>)
    expect(screen.getByLabelText('Dismiss')).toBeInTheDocument()
  })

  it('does not render dismiss button by default', () => {
    render(<Alert>Not dismissible</Alert>)
    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<Alert dismissible onDismiss={onDismiss}>Alert</Alert>)
    await user.click(screen.getByLabelText('Dismiss'))
    expect(onDismiss).toHaveBeenCalledOnce()
  })
})
