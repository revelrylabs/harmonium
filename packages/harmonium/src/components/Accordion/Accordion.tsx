import * as React from 'react'
import {Accordion as BaseAccordion} from '@base-ui/react/accordion'
import {clsx} from 'clsx'
import styles from './Accordion.module.css'

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /** Allow multiple items to be open simultaneously */
  multiple?: boolean
  /** Currently open item(s) (controlled) */
  value?: string | string[]
  /** Default open item(s) (uncontrolled) */
  defaultValue?: string | string[]
  /** Callback when open items change */
  onValueChange?: (value: string[]) => void
}

function toArray(val: string | string[] | undefined) {
  if (val === undefined) return undefined
  return Array.isArray(val) ? val : val ? [val] : []
}

/**
 * Expandable sections. One item opens at a time unless `multiple`. Each
 * trigger sits in an `<h3>`, toggles `aria-expanded` and controls a labelled
 * `region` panel. Controlled with `value` + `onValueChange`, or uncontrolled
 * with `defaultValue`.
 *
 * @category Navigation
 * @example
 * <Accordion defaultValue="shipping">
 *   <AccordionItem value="shipping">
 *     <AccordionTrigger value="shipping">Shipping</AccordionTrigger>
 *     <AccordionContent value="shipping">Ships in 2 days.</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="returns">
 *     <AccordionTrigger value="returns">Returns</AccordionTrigger>
 *     <AccordionContent value="returns">30-day returns.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({multiple = false, value, defaultValue, onValueChange, className, ...props}, ref) => {
    // Base UI only accepts arrays; keep the array stable while the value is.
    const valueKey = Array.isArray(value) ? value.join('\u0000') : value
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const controlled = React.useMemo(() => toArray(value), [valueKey])
    const [initial] = React.useState(() => toArray(defaultValue))

    return (
      <BaseAccordion.Root
        ref={ref}
        className={clsx(styles.root, className)}
        multiple={multiple}
        value={controlled}
        defaultValue={initial}
        onValueChange={(next) => onValueChange?.(next as string[])}
        {...props}
      />
    )
  },
)

Accordion.displayName = 'Accordion'

const dataState = (open: boolean) => (open ? 'open' : 'closed')

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique item value */
  value: string
}

/** One section of an `Accordion`: wraps its `AccordionTrigger` and `AccordionContent`. */
export const AccordionItem =React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({value, className, ...props}, ref) => (
    <BaseAccordion.Item
      ref={ref}
      value={value}
      className={clsx(styles.item, className)}
      render={(renderProps, state) => (
        <div {...renderProps} data-state={dataState(state.open)} />
      )}
      {...props}
    />
  ),
)

AccordionItem.displayName = 'AccordionItem'

export interface AccordionTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Item value this trigger controls (the enclosing `AccordionItem` decides) */
  value: string
}

/**
 * The button that opens and closes its `AccordionItem`, rendered inside an
 * `<h3>` heading. `ref`, `className` and other props go to the button.
 */
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({value, className, children, ...props}, ref) => (
    <BaseAccordion.Header className={styles.header}>
      <BaseAccordion.Trigger
        ref={ref}
        className={clsx(styles.trigger, className)}
        render={(renderProps, state) => (
          <button {...renderProps} data-state={dataState(state.open)}>
            {children}
            <span
              className={styles.chevron}
              data-state={dataState(state.open)}
              aria-hidden="true"
            >
              &#x25B8;
            </span>
          </button>
        )}
        {...props}
      />
    </BaseAccordion.Header>
  ),
)

AccordionTrigger.displayName = 'AccordionTrigger'

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Item value this content belongs to (the enclosing `AccordionItem` decides) */
  value: string
}

/** The collapsible panel of an `AccordionItem`, labelled by its trigger. */
export const AccordionContent =React.forwardRef<HTMLDivElement, AccordionContentProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({value, className, ...props}, ref) => (
    <BaseAccordion.Panel
      ref={ref}
      className={clsx(styles.content, className)}
      render={(renderProps, state) => (
        <div {...renderProps} data-state={dataState(state.open)} />
      )}
      {...props}
    />
  ),
)

AccordionContent.displayName = 'AccordionContent'
