import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Switch} from './Switch'

describe('Switch', () => {
  it('renders with switch role', () => {
    render(<Switch label="Notifications" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('toggles on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Switch label="Toggle" onChange={onChange} />)
    await user.click(screen.getByRole('switch'))
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('supports disabled state', () => {
    render(<Switch label="Disabled" disabled />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })
})
