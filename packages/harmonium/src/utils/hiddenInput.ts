import * as React from 'react'

type PossibleRef<T> = React.Ref<T> | undefined

function setRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (typeof ref === 'function') ref(value)
  else if (ref) (ref as React.MutableRefObject<T | null>).current = value
}

/**
 * Builds a React-style change event for value changes that Base UI reports
 * through a callback (e.g. dragging a Slider thumb) rather than a native
 * `change` event, so Harmonium can keep its `onChange(event)` API. `target`
 * and `currentTarget` are the control's native input, already holding the
 * new value.
 */
export function createChangeEvent(
  input: HTMLInputElement,
  nativeEvent: Event,
): React.ChangeEvent<HTMLInputElement> {
  let propagationStopped = false
  return {
    type: 'change',
    target: input,
    currentTarget: input,
    nativeEvent,
    bubbles: true,
    cancelable: false,
    defaultPrevented: nativeEvent.defaultPrevented,
    eventPhase: 2,
    isTrusted: nativeEvent.isTrusted,
    timeStamp: nativeEvent.timeStamp,
    preventDefault: () => nativeEvent.preventDefault(),
    isDefaultPrevented: () => nativeEvent.defaultPrevented,
    stopPropagation: () => {
      propagationStopped = true
    },
    isPropagationStopped: () => propagationStopped,
    persist: () => {},
  } as React.ChangeEvent<HTMLInputElement>
}

/**
 * Merges refs into one stable callback ref.
 */
export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback((node: T | null) => refs.forEach((ref) => setRef(ref, node)), refs)
}

/**
 * Base UI's Checkbox, Radio and Switch render a `<span role=…>` plus a
 * visually hidden native `<input>` that carries `name`/`value`/`checked` for
 * form submission. Harmonium keeps its `onChange(event)` API by listening for
 * the input's change event as it bubbles to the wrapping `<label>`.
 *
 * Returns a ref for Base UI's `inputRef` (merged with the forwarded ref) and a
 * change handler for the wrapper. The event handed to `onChange` reports the
 * hidden input as both `target` and `currentTarget`, like a native checkbox.
 */
export function useHiddenInput(
  forwardedRef: PossibleRef<HTMLInputElement>,
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const ref = useMergedRef(forwardedRef, inputRef)

  const handleChange = onChange
    ? (event: React.ChangeEvent<HTMLElement>) => {
        const input = inputRef.current
        if (!input || event.target !== input) return
        onChange(
          Object.create(event, {
            currentTarget: {value: input},
          }) as React.ChangeEvent<HTMLInputElement>,
        )
      }
    : undefined

  return {ref, onChange: handleChange}
}
