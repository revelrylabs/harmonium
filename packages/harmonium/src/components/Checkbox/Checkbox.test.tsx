import * as React from 'react'
import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {axe} from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {Checkbox} from './Checkbox'

expect.extend(matchers)

describe('Checkbox', () => {
  it('renders a checkbox', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('toggles on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Toggle" onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalled()
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  // Changed: the role="checkbox" element is now Base UI's <span>, which
  // exposes disabled through aria-disabled; the hidden native input (the one
  // that is submitted) is still `disabled`.
  it('supports disabled state', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Checkbox label="Disabled" disabled ref={ref} />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true')
    expect(ref.current).toBeDisabled()
  })

  it('is named by its label and toggles when the label is clicked', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Accept terms" />)
    await user.click(screen.getByText('Accept terms'))
    expect(screen.getByRole('checkbox', {name: 'Accept terms'})).toBeChecked()
  })

  it('passes the native input change event to onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => [
      event.target.checked,
      event.currentTarget.checked,
      event.target.name,
    ])
    render(<Checkbox label="Toggle" name="toggle" onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.results[0].value).toEqual([true, true, 'toggle'])
  })

  it('supports controlled use', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [checked, setChecked] = React.useState(false)
      return (
        <Checkbox
          label="Controlled"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      )
    }
    render(<Controlled />)
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('submits name and value with a form', async () => {
    const user = userEvent.setup()
    render(
      <form data-testid="form">
        <Checkbox label="Newsletter" name="newsletter" value="yes" />
        <Checkbox label="Terms" name="terms" defaultChecked />
      </form>,
    )
    const form = screen.getByTestId('form') as HTMLFormElement
    expect(Object.fromEntries(new FormData(form))).toEqual({terms: 'on'})
    await user.click(screen.getByRole('checkbox', {name: 'Newsletter'}))
    expect(Object.fromEntries(new FormData(form))).toEqual({newsletter: 'yes', terms: 'on'})
  })

  it('puts className and style on the visible wrapper', () => {
    render(<Checkbox label="Styled" className="custom" style={{marginTop: 8}} />)
    const wrapper = screen.getByText('Styled').closest('label')
    expect(wrapper).toHaveClass('custom')
    expect(wrapper).toHaveStyle({marginTop: '8px'})
  })

  it('reflects state in data attributes for styling', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="State" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass('indicator')
    expect(checkbox).toHaveAttribute('data-unchecked')
    await user.click(checkbox)
    expect(checkbox).toHaveAttribute('data-checked')
  })

  it('has no axe violations', async () => {
    const {container} = render(<Checkbox label="Accept terms" name="terms" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
