import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Stepper.module.css'

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current active step (0-based) */
  activeStep: number
  /** Orientation of the stepper */
  orientation?: 'horizontal' | 'vertical'
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({activeStep, orientation = 'horizontal', className, children, ...props}, ref) => {
    const steps = React.Children.toArray(children)

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-orientation={orientation}
        role="list"
        {...props}
      >
        {steps.map((child, index) => (
          <React.Fragment key={index}>
            {React.isValidElement<StepProps>(child) &&
              React.cloneElement(child, {
                'data-state':
                  index < activeStep
                    ? 'completed'
                    : index === activeStep
                      ? 'active'
                      : 'pending',
                stepNumber: index + 1,
              } as Partial<StepProps>)}
            {index < steps.length - 1 && (
              <div
                className={styles.connector}
                data-state={index < activeStep ? 'completed' : 'pending'}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  },
)

Stepper.displayName = 'Stepper'

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label for the step */
  label: string
  /** Optional description */
  description?: string
  /** Step number (injected by Stepper) */
  stepNumber?: number
  /** State (injected by Stepper) */
  'data-state'?: 'completed' | 'active' | 'pending'
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({label, description, stepNumber, className, ...props}, ref) => {
    const state = props['data-state'] ?? 'pending'

    return (
      <div ref={ref} className={clsx(styles.step, className)} role="listitem" {...props}>
        <div className={styles.indicator} data-state={state}>
          {state === 'completed' ? '✓' : stepNumber}
        </div>
        <div className={styles.content}>
          <div className={styles.label}>{label}</div>
          {description && <div className={styles.description}>{description}</div>}
        </div>
      </div>
    )
  },
)

Step.displayName = 'Step'
