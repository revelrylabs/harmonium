import * as React from 'react'
import {clsx} from 'clsx'
import styles from './TopBar.module.css'

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the TopBar is fixed to the top */
  fixed?: boolean
}

export const TopBar = React.forwardRef<HTMLElement, TopBarProps>(
  ({fixed, className, children, ...props}, ref) => (
    <header
      ref={ref}
      className={clsx(styles.root, className)}
      data-fixed={fixed || undefined}
      {...props}
    >
      <div className={styles.inner}>{children}</div>
    </header>
  ),
)

TopBar.displayName = 'TopBar'

export interface TopBarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of this section */
  align?: 'left' | 'center' | 'right'
}

export const TopBarSection = React.forwardRef<HTMLDivElement, TopBarSectionProps>(
  ({align = 'left', className, children, ...props}, ref) => (
    <div
      ref={ref}
      className={clsx(styles.section, className)}
      data-align={align}
      {...props}
    >
      {children}
    </div>
  ),
)

TopBarSection.displayName = 'TopBarSection'
