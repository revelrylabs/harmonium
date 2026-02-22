import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Stepper, Step} from './Stepper'

describe('Stepper', () => {
  it('renders steps', () => {
    render(
      <Stepper activeStep={0}>
        <Step label="Account" />
        <Step label="Profile" />
        <Step label="Review" />
      </Stepper>,
    )
    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
  })

  it('marks active step', () => {
    render(
      <Stepper activeStep={1}>
        <Step label="Account" />
        <Step label="Profile" />
        <Step label="Review" />
      </Stepper>,
    )
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveAttribute('data-state', 'completed')
    expect(items[1]).toHaveAttribute('data-state', 'active')
    expect(items[2]).toHaveAttribute('data-state', 'pending')
  })

  it('shows checkmark for completed steps', () => {
    render(
      <Stepper activeStep={2}>
        <Step label="Account" />
        <Step label="Profile" />
        <Step label="Review" />
      </Stepper>,
    )
    // First two steps should show checkmarks
    expect(screen.getAllByText('✓')).toHaveLength(2)
  })

  it('shows step numbers for non-completed steps', () => {
    render(
      <Stepper activeStep={0}>
        <Step label="Account" />
        <Step label="Profile" />
      </Stepper>,
    )
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(
      <Stepper activeStep={0}>
        <Step label="Account" description="Create your account" />
      </Stepper>,
    )
    expect(screen.getByText('Create your account')).toBeInTheDocument()
  })

  it('supports vertical orientation', () => {
    render(
      <Stepper activeStep={0} orientation="vertical" data-testid="stepper">
        <Step label="Step 1" />
        <Step label="Step 2" />
      </Stepper>,
    )
    expect(screen.getByTestId('stepper')).toHaveAttribute('data-orientation', 'vertical')
  })
})
