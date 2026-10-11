import * as React from 'react'
import {clsx} from 'clsx'
import styles from './TopBar.module.css'

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the TopBar is fixed to the top */
  fixed?: boolean
}

/**
 * An application header bar (`<header>`) with `TopBarSection`s aligned
 * left, center or right. `fixed` pins it to the top of the viewport.
 *
 * @category Navigation
 * @example
 * <TopBar>
 *   <TopBarSection align="left"><strong>Acme</strong></TopBarSection>
 *   <TopBarSection align="right"><Avatar fallback="JD" size="sm" /></TopBarSection>
 * </TopBar>
 */
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

/** A group of items in a `TopBar`, aligned with `align`. */
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
