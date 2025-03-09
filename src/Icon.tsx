import React from 'react'
import classNames from 'classnames'

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  i?: string
  icon?: string
  className?: string
}

/**
 * Icon component to display icons
 * @param props - Component props
 * @returns Icon component
 */
const Icon: React.FC<IconProps> = (props) => {
  const { className, i, icon, ...passthrough } = props

  if (icon) {
    // eslint-disable-next-line no-console
    console.warn(
      'The `icon` property has been deprecated and will be removed in a future version. Please use <Icon i="icon-name" /> instead.'
    )
  }
  
  const iconName = i || icon

  const newClassName = classNames(
    className,
    iconName,
    'rev-Icon',
    `rev-Icon--${iconName}`
  )

  return <i {...passthrough} className={newClassName} />
}

export default Icon 