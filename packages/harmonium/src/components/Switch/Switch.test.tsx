import * as React from 'react'
import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {Switch} from './Switch'

expect.extend(matchers)

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

  // Changed: the role="switch" element is now Base UI's <span>, which exposes
  // disabled through aria-disabled; the hidden native input is still disabled.
  it('supports disabled state', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Switch label="Disabled" disabled ref={ref} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true')
    expect(ref.current).toBeDisabled()
  })

  it('is named by its label and passes the change event to onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => event.target.checked)
    render(<Switch label="Wi-Fi" onChange={onChange} />)
    await user.click(screen.getByText('Wi-Fi'))
    expect(screen.getByRole('switch', {name: 'Wi-Fi'})).toBeChecked()
    expect(onChange).toHaveReturnedWith(true)
  })

  it('submits name and value with a form', async () => {
    const user = userEvent.setup()
    render(
      <form data-testid="form">
        <Switch label="Alerts" name="alerts" />
      </form>,
    )
    const form = screen.getByTestId('form') as HTMLFormElement
    expect(new FormData(form).get('alerts')).toBeNull()
    await user.click(screen.getByRole('switch'))
    expect(new FormData(form).get('alerts')).toBe('on')
  })

  it('keeps size and puts className and style on the wrapper', () => {
    render(<Switch label="Styled" size="lg" className="custom" style={{marginTop: 8}} />)
    const wrapper = screen.getByText('Styled').closest('label')
    expect(wrapper).toHaveAttribute('data-size', 'lg')
    expect(wrapper).toHaveClass('custom')
    expect(wrapper).toHaveStyle({marginTop: '8px'})
    expect(screen.getByRole('switch')).toHaveClass('track')
  })

  it('has no axe violations', async () => {
    const {container} = render(<Switch label="Notifications" name="notify" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
