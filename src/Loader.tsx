import React from 'react'
import { omit, gt, has, reduce, without } from 'lodash'

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: string
  children?: React.ReactNode
  color?: string
  duration?: string
  huge?: boolean
  large?: boolean
  medium?: boolean
  secondaryColor?: string
  size?: string
  small?: boolean
  style?: React.CSSProperties
}

/**
 * Size-related props.
 * Itemizes style configurations for the various size props that may be passed.
 */
const sizeRelatedProps = ['huge', 'large', 'medium', 'size', 'small']

/**
 * Increment.
 * Provided a number, returns its value, incremented by one.
 */
function inc(num = 0): number {
  return num + 1
}

/**
 * Loader component for displaying loading states
 * @param props - Component props
 * @returns Loader component
 */
const Loader: React.FC<LoaderProps> = (props) => {
  /**
   * Sum properties in object.
   * Provided a list of attributes, and provided an object, returns an integer
   * representing the total number of attributes encompassed by the object.
   */
  const sumPropsInObj = (attrs: string[] = [], obj: Record<string, any> = {}): number => {
    return reduce(attrs, (acc, curr) => (has(obj, curr) ? inc(acc) : acc), 0)
  }

  /**
   * Ensure no prop conflicts.
   * Verifies that developer has not passed any conflicting props. Provided so,
   * throws an error.
   */
  const ensureNoConflicts = (propsToCheck: Record<string, any> = {}): void => {
    const sum = sumPropsInObj(sizeRelatedProps, propsToCheck)

    if (gt(sum, 1)) {
      throw Error(
        `You have specified more than one of the following size-related props:
        small, medium, large, huge, size. Only one of these props may be
        specified per each component instance.`
      )
    }
  }

  /**
   * Resolve class name.
   * Provided props, return a `className` that reflects only up to one of
   * our size-related props, such as `small`, `medium`, `large`, or `huge`.
   */
  const resolveClassNames = (propsToCheck: Record<string, any> = {}): string => {
    // Allocate all size-related props except `size`.
    const classes = without(sizeRelatedProps, 'size')

    return reduce(
      classes,
      (acc, curr) => (propsToCheck[curr] ? acc.concat(`rev-Loader--${curr}`) : acc),
      ''
    )
  }

  /**
   * Resolve styles.
   * Provided props, return a consolidated `styles` object, using
   * props.style as overrides.
   */
  const resolveStyles = (propsToCheck: Record<string, any> = {}): React.CSSProperties => {
    const styles: React.CSSProperties = {
      animationDuration: propsToCheck.duration,
      borderColor: propsToCheck.secondaryColor,
      borderTopColor: propsToCheck.color,
      borderWidth: propsToCheck.borderWidth,
      height: propsToCheck.size,
      width: propsToCheck.size,
    }
    const overrides = propsToCheck.style || {}

    return { ...styles, ...overrides }
  }

  const propsToUse = omit(props, 'className')

  ensureNoConflicts(propsToUse)

  const classes = resolveClassNames(propsToUse)
  const styles = resolveStyles(propsToUse)

  return (
    <div className={`rev-Loader ${classes}`} style={styles}>
      {propsToUse.children}
    </div>
  )
}

export default Loader 