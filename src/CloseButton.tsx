import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  absolute: 'rev-CloseButton--absolute',
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Position the close button absolutely
   */
  absolute?: boolean
}

/**
 * A button component used for closing modals, toasts, etc.
 */
const CloseButton: React.FC<CloseButtonProps> = ({
  className,
  children,
  ...props
}) => {
  const propClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (props[name as keyof typeof props]) {
      propClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete props[name as keyof typeof props]
  })

  const newClassName = classNames(className, 'rev-CloseButton', propClassNames)

  return (
    <button type="button" {...props} className={newClassName}>
      {children}
    </button>
  )
}

export default CloseButton 