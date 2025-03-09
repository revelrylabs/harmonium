import React, { useState } from 'react'
import StatelessModal from './StatelessModal'

export interface ModalProps {
  isOpen?: boolean
  onBackgroundClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void
  children?: React.ReactNode
}

/**
 * Modal component with state management for the open/closed state
 * @param props - Component props
 * @returns Modal component
 */
const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen = false, onBackgroundClick, children } = props
  const [modalOpen, setModalOpen] = useState<boolean>(isOpen)

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    setModalOpen(false)
    if (onBackgroundClick) {
      onBackgroundClick(e)
    }
  }

  return (
    <StatelessModal isOpen={modalOpen} onBackgroundClick={handleBackgroundClick}>
      {children}
    </StatelessModal>
  )
}

export default Modal 