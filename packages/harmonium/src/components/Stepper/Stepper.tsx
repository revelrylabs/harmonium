import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Stepper.module.css'

/** Hides text visually while keeping it in the accessibility tree. */
const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current active step (0-based) */
  activeStep: number
  /** Orientation of the stepper */
  orientation?: 'horizontal' | 'vertical'
  /**
   * Text announced to screen readers for completed steps, whose indicator
   * shows only a check mark.
   * @default 'Completed'
   */
  completedLabel?: string
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      activeStep,
      orientation = 'horizontal',
      completedLabel,
      className,
      children,
      ...props
    },
    ref,
  ) => {
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
                completedLabel: child.props.completedLabel ?? completedLabel,
              } as Partial<StepProps>)}
            {index < steps.length - 1 && (
              <div
                aria-hidden="true"
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
  /**
   * Text announced to screen readers for a completed step
   * @default 'Completed'
   */
  completedLabel?: string
  /** State (injected by Stepper) */
  'data-state'?: 'completed' | 'active' | 'pending'
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  (
    {
      label,
      description,
      stepNumber,
      completedLabel = 'Completed',
      className,
      ...props
    },
    ref,
  ) => {
    const state = props['data-state'] ?? 'pending'

    return (
      <div
        ref={ref}
        className={clsx(styles.step, className)}
        role="listitem"
        aria-current={state === 'active' ? 'step' : undefined}
        {...props}
      >
        <div className={styles.indicator} data-state={state}>
          {state === 'completed' ? (
            <>
              <span aria-hidden="true">✓</span>
              <span style={visuallyHidden}>{completedLabel}</span>
            </>
          ) : (
            stepNumber
          )}
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
