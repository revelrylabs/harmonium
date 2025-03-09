import React from 'react'
import classNames from 'classnames'

export interface StatelessModalProps {
  isOpen?: boolean
  onBackgroundClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void
  className?: string
  children?: React.ReactNode
}

/**
 * StatelessModal component for displaying modal content without state management
 * @param props - Component props
 * @returns StatelessModal component
 */
const StatelessModal: React.FC<StatelessModalProps> = (props) => {
  const { isOpen = false, onBackgroundClick, className, children } = props

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (onBackgroundClick) {
      onBackgroundClick(e)
    }
  }

  const modalClassName = classNames(className, {
    'rev-Modal': true,
    'rev-Modal--open': isOpen,
    'rev-Modal--closed': !isOpen,
  })

  return (
    <div className={modalClassName}>
      <div
        role="button"
        className="rev-Modal-background"
        onClick={handleBackgroundClick}
        onKeyPress={handleBackgroundClick}
        tabIndex={0}
      />
      <div className="rev-Modal-content">{children}</div>
    </div>
  )
}

export default StatelessModal 