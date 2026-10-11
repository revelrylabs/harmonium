import * as React from 'react'
import {clsx} from 'clsx'
import {useRender} from '@base-ui/react/use-render'
import styles from './Sidebar.module.css'

interface SidebarContextValue {
  collapsed: boolean
}

const SidebarContext = React.createContext<SidebarContextValue>({
  collapsed: false,
})

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the sidebar is collapsed to icon-only mode */
  collapsed?: boolean
  /** Width variant */
  width?: 'sm' | 'md' | 'lg'
}

/**
 * Side navigation: a `<nav>` of `SidebarSection`s and `SidebarItem`s. When
 * `collapsed`, items show only their icons and keep their label as their
 * accessible name. Give it an `aria-label` when the page has more than one
 * `<nav>`.
 *
 * @category Layout
 * @example
 * <Sidebar aria-label="Main" collapsed={collapsed}>
 *   <SidebarSection label="Workspace">
 *     <SidebarItem icon={<HomeIcon />} href="/" active>Home</SidebarItem>
 *     <SidebarItem icon={<GearIcon />} render={<Link to="/settings" />}>Settings</SidebarItem>
 *   </SidebarSection>
 * </Sidebar>
 */
export const Sidebar =React.forwardRef<HTMLElement, SidebarProps>(
  ({collapsed, width = 'md', className, children, ...props}, ref) => {
    const context = React.useMemo(
      () => ({collapsed: Boolean(collapsed)}),
      [collapsed],
    )

    return (
      <SidebarContext.Provider value={context}>
        <nav
          ref={ref}
          className={clsx(styles.root, className)}
          data-collapsed={collapsed || undefined}
          data-width={width}
          {...props}
        >
          {children}
        </nav>
      </SidebarContext.Provider>
    )
  },
)

Sidebar.displayName = 'Sidebar'

export interface SidebarSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional label for the section. Also names the section as a group. */
  label?: string
}

/** A group of `SidebarItem`s, optionally labelled. */
export const SidebarSection =React.forwardRef<
  HTMLDivElement,
  SidebarSectionProps
>(({label, className, children, ...props}, ref) => {
  const labelId = React.useId()

  return (
    <div
      ref={ref}
      className={clsx(styles.section, className)}
      role={label ? 'group' : undefined}
      aria-labelledby={label ? labelId : undefined}
      {...props}
    >
      {label && (
        <div id={labelId} className={styles.sectionLabel}>
          {label}
        </div>
      )}
      {children}
    </div>
  )
})

SidebarSection.displayName = 'SidebarSection'

type AnchorOnlyProps = Pick<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'target' | 'rel' | 'download' | 'hrefLang' | 'referrerPolicy'
>

export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    AnchorOnlyProps {
  /** Whether this item is the current page. Sets `aria-current="page"`. */
  active?: boolean
  /** Optional icon element rendered before the label */
  icon?: React.ReactNode
  /**
   * Link target. When set, the item renders as an `<a>` instead of a
   * `<button>`.
   */
  href?: string
  /**
   * Replaces the rendered element, e.g. a router link:
   * `render={<Link to="/settings" />}`. Harmonium's props (class, data
   * attributes, ARIA) are merged onto it.
   */
  render?: React.ReactElement
}

/** Plain text of a React node, used to name icon-only items. */
function getNodeText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join('')
  if (React.isValidElement<{children?: React.ReactNode}>(node)) {
    return getNodeText(node.props.children)
  }
  return ''
}

/**
 * A navigation item: a `<button>`, an `<a>` with `href`, or your router link
 * with `render`. `active` marks the current page. A disabled item can't be
 * focused or followed.
 */
export const SidebarItem =React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  SidebarItemProps
>(
  (
    {
      active,
      icon,
      className,
      children,
      render,
      href,
      type,
      disabled,
      ...props
    },
    ref,
  ) => {
    const {collapsed} = React.useContext(SidebarContext)
    const isLink = href !== undefined
    const isNativeButton = !render && !isLink

    // Collapsed sidebars hide the label visually, so name the item from it.
    const text = collapsed ? getNodeText(children).trim() : ''

    const ownProps: Record<string, unknown> = {
      className: clsx(styles.item, className),
      'data-active': active || undefined,
      'aria-current': active ? 'page' : undefined,
      'aria-label': text || undefined,
      title: text || undefined,
      children: (
        <>
          {icon && (
            <span className={styles.itemIcon} aria-hidden="true">
              {icon}
            </span>
          )}
          <span className={styles.itemLabel}>{children}</span>
        </>
      ),
    }

    if (isNativeButton) {
      ownProps.type = type ?? 'button'
      ownProps.disabled = disabled
    } else if (disabled) {
      // Links can't be disabled natively: drop the target and say so.
      ownProps['aria-disabled'] = true
    } else if (isLink) {
      ownProps.href = href
    }

    // Consumer props come after ours so explicit `aria-label`, `title` or
    // `aria-current` still win; `className` was already merged above.
    const merged: Record<string, unknown> = {...ownProps}
    for (const [key, value] of Object.entries(props)) {
      if (value !== undefined) merged[key] = value
    }

    // A disabled router link (via `render`) keeps its target, so take it out
    // of the tab order and cancel activation. Routers skip navigation when
    // the click is default-prevented.
    if (disabled && !isNativeButton) {
      merged.tabIndex = -1
      merged.onClick = (event: React.MouseEvent) => event.preventDefault()
      merged.onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') event.preventDefault()
      }
    }

    return useRender({
      render,
      ref: ref as React.Ref<HTMLElement>,
      defaultTagName: isLink ? 'a' : 'button',
      props: merged,
    })
  },
)

SidebarItem.displayName = 'SidebarItem'
