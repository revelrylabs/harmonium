import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Separator.module.css'

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Orientation of the separator */
  orientation?: 'horizontal' | 'vertical'
  /** Spacing around the separator */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({orientation = 'horizontal', spacing = 'md', className, ...props}, ref) => {
    return (
      <hr
        ref={ref}
        className={clsx(styles.root, className)}
        data-orientation={orientation}
        data-spacing={spacing}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    )
  },
)

Separator.displayName = 'Separator'
