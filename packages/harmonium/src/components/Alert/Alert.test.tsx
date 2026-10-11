import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Alert} from './Alert'
import {configureAxe} from 'vitest-axe'
// jsdom has no layout, so colour contrast can't be computed here
const axe = configureAxe({rules: {'color-contrast': {enabled: false}}})


describe('Alert', () => {
  // Only warning/error use role="alert" now (#688); info is role="status"
  it('renders with alert role', () => {
    render(<Alert variant="error">Message</Alert>)
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


  it.each(['info', 'success'] as const)('announces %s politely with role="status"', (variant) => {
    render(<Alert variant={variant}>Saved</Alert>)
    expect(screen.getByRole('status')).toHaveTextContent('Saved')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it.each(['warning', 'error'] as const)('announces %s assertively with role="alert"', (variant) => {
    render(<Alert variant={variant}>Failed</Alert>)
    expect(screen.getByRole('alert')).toHaveTextContent('Failed')
  })

  it('lets the consumer override the role', () => {
    render(<Alert role="alert">Urgent info</Alert>)
    expect(screen.getByRole('alert')).toHaveTextContent('Urgent info')
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <>
        <Alert>Info</Alert>
        <Alert variant="error" dismissible>
          Error
        </Alert>
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
