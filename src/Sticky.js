import React, {cloneElement, Component} from 'react'
import classNames from 'classnames'

const StickyContent = ({
  children,
  className,
  ...props
}) => {
  const itemClassName = classNames(className, 'rev-Sticky-content')

  return (
    <div className={itemClassName} {...props}>
      {children}
    </div>
  )
}

const Sticky = ({
  children,
  className,
  ...props
}) => {
  const containerClassName = classNames(className, 'rev-Sticky')

  return (
    <div className={containerClassName} {...props}>
      <StickyContent>
        {children}
      </StickyContent>
    </div>
  )
}

export default Sticky
